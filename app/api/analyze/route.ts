import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'

export async function POST(request: NextRequest) {
  function safeParseAI(text: string) {
    try {
      // 1. Find the actual JSON block - ignores conversational text before/after
      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');

      if (startIdx === -1 || endIdx === -1) return null;

      let jsonString = text.substring(startIdx, endIdx + 1);

      // 2. Fix common AI syntax errors (trailing commas and control characters)
      const sanitized = jsonString
        .replace(/,\s*\]/g, ']') // removes [ "a", "b", ] -> [ "a", "b" ]
        .replace(/,\s*\}/g, '}') // removes { "a": 1, } -> { "a": 1 }
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // removes invisible bad chars

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
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer and extract text
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await pdf(buffer)
    
    // TRUNCATE input text to ensure AI has enough output room for JSON
    const resumeText = pdfData.text.slice(0, 6000)
    const truncatedJD = jobDescription ? jobDescription.slice(0, 3000) : null

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF.' },
        { status: 400 }
      )
    }

    // Updated prompt with stricter formatting rules
    let prompt = `You are an expert resume analyst and career coach. Analyze the following resume and provide detailed feedback.

Resume Content:
${resumeText}

Please analyze this resume and provide:
1. An overall score (0-100)
2. A brief summary (2-3 sentences)
3. A list of detected skills
4. Key strengths (3-5)
5. Areas for improvement (3-5)

${truncatedJD ? `
BONUS TASK:
Job Description:
${truncatedJD}

Also provide:
6. Job match score (0-100)
7. Matching skills
8. Missing skills
9. Suggestions
` : ''}

Respond ONLY with valid JSON. Do not include any intro text or markdown.
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
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        web_access: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API Error:', errorData)
      return NextResponse.json(
        { error: 'AI analysis failed.' },
        { status: 500 }
      )
    }

    const data = await response.json()

    const aiResponse =
      data?.result ||
      data?.response ||
      data?.message ||
      data?.output ||
      ''

    if (!aiResponse) {
      console.error('Unexpected API response:', data)
      return NextResponse.json(
        { error: 'Invalid AI response format.' },
        { status: 500 }
      )
    }

    // Use the optimized safe parser
    const analysisResult = safeParseAI(aiResponse)

    if (!analysisResult) {
      console.error('Final Parse Error. Raw response:', aiResponse)
      return NextResponse.json(
        { 
          error: 'AI returned invalid JSON structure',
          debug: aiResponse.slice(-100) // Shows the end of the response to check truncation
        },
        { status: 500 }
      )
    }

    return NextResponse.json(analysisResult)

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Unexpected server error.' },
      { status: 500 }
    )
  }
}