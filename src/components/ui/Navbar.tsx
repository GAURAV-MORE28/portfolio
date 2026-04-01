'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineSun, HiOutlineMoon, HiBars3, HiXMark } from 'react-icons/hi2'
import Link from 'next/link'
import { DURATION, EASE_SYSTEM } from '@/lib/motionSystem'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: DURATION.block, ease: EASE_SYSTEM }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#050000]/85 backdrop-blur-xl border-b border-white/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="#home" className="text-xl font-heading font-extrabold tracking-tight group">
          <span className="text-[#ffe5e5] group-hover:text-red-400 transition-colors">Gaurav</span>
          <span className="text-gradient">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: DURATION.micro, ease: EASE_SYSTEM }}
              className="relative text-sm font-medium text-[#b38080] hover:text-[#ffe5e5] transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-400 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}


          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-sm font-semibold border border-red-600 text-red-500 hover:bg-red-600/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300"
          >
            Hire Me
          </a>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#ffe5e5]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.micro, ease: EASE_SYSTEM }}
            className="md:hidden overflow-hidden bg-[#050000]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-[#b38080] hover:text-[#ffe5e5] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-5 py-3 rounded-full text-center text-sm font-semibold border border-red-600 text-red-500 hover:bg-red-600/10 transition-all"
              >
                Hire Me
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
