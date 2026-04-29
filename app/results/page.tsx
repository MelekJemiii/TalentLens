'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, CheckCircle, AlertCircle, Sparkles, Target, Award, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

interface AnalysisResult {
  score: number
  summary: string
  skills: string[]
  strengths: string[]
  improvements: string[]
  jobMatch?: {
    score: number
    matched: string[]
    missing: string[]
    suggestions: string[]
  }
}

export default function ResultsPage() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = sessionStorage.getItem('analysisResult')
    if (storedResult) {
      setAnalysis(JSON.parse(storedResult))
    } else {
      // No result found, redirect to analyze page
      router.push('/analyze')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <CheckCircle size={16} />
            <span className="text-sm font-semibold">Analysis Complete</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Resume Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Here's what our AI found in your resume
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="card mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-100 to-accent-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="text-brand-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Overall Score</h2>
            </div>
            <div className="mb-6">
              <div className={`text-7xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
                {analysis.score}
                <span className="text-4xl">/100</span>
              </div>
              <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.score)} text-white font-semibold text-lg`}>
                {getScoreLabel(analysis.score)}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className={`h-4 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.score)} transition-all duration-1000`}
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{analysis.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Strengths</h2>
            </div>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Areas to Improve</h2>
            </div>
            <ul className="space-y-3">
              {analysis.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills Detected */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <Sparkles className="text-brand-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Skills Detected</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-brand-50 to-accent-50 text-brand-700 rounded-lg font-medium border border-brand-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Job Match Section (if available) */}
        {analysis.jobMatch && (
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="text-purple-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Job Match Analysis</h2>
                <p className="text-gray-600">How well your resume matches the job description</p>
              </div>
            </div>

            {/* Match Score */}
            <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-center mb-4">
                <div className={`text-5xl font-bold ${getScoreColor(analysis.jobMatch.score)} mb-2`}>
                  {analysis.jobMatch.score}%
                </div>
                <p className="text-gray-700 font-medium">Match Score</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.jobMatch.score)}`}
                  style={{ width: `${analysis.jobMatch.score}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  Matched Skills
                </h3>
                <ul className="space-y-2">
                  {analysis.jobMatch.matched.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="text-orange-600" size={20} />
                  Missing Skills
                </h3>
                <ul className="space-y-2">
                  {analysis.jobMatch.missing.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="text-brand-600" size={20} />
                Recommendations
              </h3>
              <ul className="space-y-3">
                {analysis.jobMatch.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <ArrowRight className="text-brand-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/analyze" className="btn-primary text-center">
            Analyze Another Resume
          </Link>
         
        </div>
      </div>
    </div>
  )
}