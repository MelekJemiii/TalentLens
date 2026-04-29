'use client'

import Link from 'next/link'
import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
         
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">TalentLens</span>
              <span className="text-xs text-gray-500 -mt-1">AI Resume Analyzer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/analyze" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              Analyze Resume
            </Link>
            <Link href="/analyze" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-brand-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/analyze"
                className="text-gray-600 hover:text-brand-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analyze Resume
              </Link>
              <Link
                href="/analyze"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}