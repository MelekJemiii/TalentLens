import { Sparkles, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TalentLens</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Empower your career with AI-driven resume analysis. Get instant insights,
              improve your skills presentation, and match with your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="/analyze" className="hover:text-brand-400 transition-colors">Analyze Resume</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/MelekJemiii" className="hover:text-brand-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-melek-jemai-51126929b" className="hover:text-brand-400 transition-colors">
                <Linkedin size={20} />
              </a>
             
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TalentLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}