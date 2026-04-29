import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'

export async function POST(request: NextRequest) {
  function safeParseAI(text: string) {
    try {
      let cleaned = text.trim();

      // --- PANIC FIX: TRUNCATION RECOVERY ---
      // If the AI cut off before closing the JSON, we manually add the closers
      if (!cleaned.endsWith('}')) {
        console.warn("JSON appears truncated, attempting recovery...");
        if (!cleaned.includes(']')) cleaned += '"]'; // Close a string and array if needed
        if (cleaned.includes('jobMatch') && !cleaned.includes('}')) cleaned += '}}';
        else if (!cleaned.endsWith('}')) cleaned += '}';
      }

      // 1. Extract the JSON block
      const startIdx = cleaned.indexOf('{');
      const endIdx = cleaned.lastIndexOf('}');

      if (startIdx === -1 || endIdx === -1) return null;

      let jsonString = cleaned.substring(startIdx, endIdx + 1);

      // 2. Fix common syntax errors
      const sanitized = jsonString
        .replace(/,\s*\]/g, ']') // No trailing commas in arrays
        .replace(/,\s*\}/g, '}') // No trailing commas in objects
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // No bad control characters

      return JSON.parse(sanitized);
    } catch (err) {
      console.error('❌ SAFE PARSE FAILED', err);
      return null;
    }
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const jobDescription = formData.get('jobDescription') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await pdf(buffer)
    
    // REDUCE input size: Only take the first 4000 chars of resume and 2000 of JD
    // This gives the AI more "token space" to finish its response.
    const resumeText = pdfData.text.slice(0, 4000)
    const truncatedJD = jobDescription ? jobDescription.slice(0, 2000) : null

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json({ error: 'Could not extract text.' }, { status: 400 })
    }

    // Force the AI to be concise to avoid hitting the 4096 character limit
    let prompt = `You are an expert resume analyst. Analyze this resume. 
    IMPORTANT: Be extremely concise. Limit each list to EXACTLY 3 short items.
    
    Resume: ${resumeText}
    ${truncatedJD ? `Job Description: ${truncatedJD}` : ''}

    Respond ONLY with valid JSON:
    {
      "score": number,
      "summary": "string",
      "skills": ["string"],
      "strengths": ["string"],
      "improvements": ["string"]
      ${truncatedJD ? `,
      "jobMatch": {
        "score": number,
        "matched": ["string"],
        "missing": ["string"],
        "suggestions": ["string"]
      }` : ''}
    }`

    const response = await fetch('https://open-ai21.p.rapidapi.com/conversationllama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        web_access: false,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'AI analysis failed.' }, { status: 500 })
    }

    const data = await response.json()
    const aiResponse = data?.result || data?.response || data?.message || data?.output || ''

    const analysisResult = safeParseAI(aiResponse)

    if (!analysisResult) {
      return NextResponse.json({ 
        error: 'AI output was too long and got cut off.',
        debug: aiResponse.slice(-50) 
      }, { status: 500 })
    }

    return NextResponse.json(analysisResult)

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 })
  }
}