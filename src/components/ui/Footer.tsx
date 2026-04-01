import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi'
import { siteConfig } from '@/data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0a0000]/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <a href="#home" className="text-xl font-heading font-extrabold tracking-tight">
              Gaurav<span className="text-gradient">.</span>
            </a>
          </div>

          <p className="text-sm text-[#b38080] flex items-center gap-1.5 font-medium">
            Designed & Built with{' '}
            <FiHeart className="w-3.5 h-3.5 text-red-500" /> by {siteConfig.name}
            © {currentYear}
          </p>

          <div className="flex gap-5">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#b38080] hover:text-[#ffe5e5] transition-colors hover:scale-110 active:scale-95 duration-200"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#b38080] hover:text-[#ffe5e5] transition-colors hover:scale-110 active:scale-95 duration-200"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
