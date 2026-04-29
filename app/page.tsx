'use client'

import Link from 'next/link'
import { Sparkles, Upload, Brain, Target, TrendingUp, CheckCircle, Zap, Shield, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-accent-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full mb-6">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">AI-Powered Analysis</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Resume with{' '}
                <span className="gradient-text">AI Insights</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get instant, professional feedback on your resume. Powered by advanced AI
                to analyze skills, match job descriptions, and boost your career prospects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/analyze" className="btn-primary text-center">
                  Analyze Your Resume
                </Link>
                <button className="btn-secondary">
                  See How It Works
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Free Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Private & Secure</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative animate-slide-in-right">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                  AI Powered
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-xl">
                    <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center">
                      <Upload className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Upload Resume</p>
                      <p className="text-sm text-gray-600">PDF format supported</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-accent-50 rounded-xl">
                    <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center">
                      <Brain className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI Analysis</p>
                      <p className="text-sm text-gray-600">Deep skill evaluation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Target className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Get Results</p>
                      <p className="text-sm text-gray-600">Actionable feedback</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-200 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features to Elevate Your Resume
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive analysis to help you stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Skill Analysis</h3>
              <p className="text-gray-600">
                Advanced algorithms identify and evaluate your skills, highlighting strengths
                and areas for improvement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Job Matching</h3>
              <p className="text-gray-600">
                Compare your resume against job descriptions to see how well you match
                and what skills to highlight.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Score</h3>
              <p className="text-gray-600">
                Receive an objective score with detailed breakdowns of what works
                and what needs attention.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Feedback</h3>
              <p className="text-gray-600">
                Get results in seconds, not days. Our AI processes your resume
                instantly with professional insights.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600">
                Your data is secure and private. We never store or share your
                personal information.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Always Available</h3>
              <p className="text-gray-600">
                Analyze your resume anytime, anywhere. No appointments,
                no waiting, just instant analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-xl text-brand-100 mb-8">
            Join thousands of professionals who have improved their resumes with TalentLens
          </p>
          <Link href="/analyze" className="inline-block bg-white text-brand-600 font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200 text-lg">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">10K+</p>
              <p className="text-gray-600">Resumes Analyzed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">95%</p>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2"> 30s</p>
              <p className="text-gray-600">Average Analysis</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">4.9/5</p>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}