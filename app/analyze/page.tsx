'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Briefcase, Sparkles, AlertCircle, CheckCircle, Loader } from 'lucide-react'

export default function AnalyzePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
    } else {
      setError('Please upload a PDF file')
      setFile(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription)
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const result = await response.json()
      
      // Store result in sessionStorage and navigate to results page
      sessionStorage.setItem('analysisResult', JSON.stringify(result))
      router.push('/results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analyze Your Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered insights to improve your career prospects
          </p>
        </div>

        {/* Main Card */}
        <div className="card max-w-3xl mx-auto">
          {/* File Upload Section */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <FileText className="text-brand-600" size={24} />
              Upload Your Resume
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                dragActive
                  ? 'border-brand-500 bg-brand-50'
                  : file
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-brand-400 bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {file ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{file.name}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <label
                    htmlFor="resume-upload"
                    className="inline-block text-brand-600 hover:text-brand-700 font-medium cursor-pointer"
                  >
                    Change File
                  </label>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-brand-600" size={32} />
                  </div>
                  <label
                    htmlFor="resume-upload"
                    className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-brand-600 transition-colors"
                  >
                    Click to upload or drag and drop
                  </label>
                  <p className="text-sm text-gray-600 mt-2">PDF format only (Max 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Description Section (Optional) */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Briefcase className="text-accent-600" size={24} />
              Job Description
              <span className="text-sm font-normal text-gray-500">(Optional - for matching)</span>
            </label>
            
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to see how well your resume matches..."
              className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Add a job description to get tailored matching insights and recommendations
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              loading || !file
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin" size={20} />
                Analyzing Resume...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={20} />
                Analyze My Resume
              </span>
            )}
          </button>

          {/* Info Section */}
          <div className="mt-8 p-6 bg-gradient-to-br from-brand-50 to-accent-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="text-brand-600" size={20} />
              What You'll Get:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span>Comprehensive skill analysis and evaluation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span>Performance score with detailed feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span>Strengths and areas for improvement</span>
              </li>
              {jobDescription && (
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span>Job match analysis with specific recommendations</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}