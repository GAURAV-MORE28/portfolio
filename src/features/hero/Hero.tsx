'use client'

import { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { siteConfig } from '@/data/content'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi'
import { DURATION, EASE_SYSTEM } from '@/lib/motionSystem'

const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'Deep Learning Enthusiast',
  'Problem Solver',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const speed = isDeleting ? 40 : 80

    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayedText === '') {
      const loopTimeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 30)
      return () => clearTimeout(loopTimeout)
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentRole.substring(0, displayedText.length - 1)
          : currentRole.substring(0, displayedText.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, roleIndex])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.095,
        delayChildren: 0.16,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.block, ease: EASE_SYSTEM },
    },
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center pt-24 lg:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-red-400/30 bg-red-400/5 text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              Available for Opportunities
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border border-red-900/50 bg-red-950/40 text-red-300">
              AI/ML Pipeline
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border border-red-900/50 bg-red-950/40 text-red-300">
              Full-Stack Systems
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-[1.08] tracking-tight mb-4 text-[#ffe5e5]"
          >
            Architecting <span className="text-gradient font-mono uppercase tracking-widest text-3xl sm:text-4xl lg:text-5xl">Intelligent</span>
            <br />
            Systems & Solutions
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-lg sm:text-xl text-[#b38080] mb-2 font-heading min-h-[32px]"
          >
            I&apos;m <span className="text-[#ffe5e5] font-semibold">{siteConfig.name}</span> —{' '}
            <span className="text-red-500">
              {displayedText}
              <span className="animate-pulse ml-0.5 text-red-400">|</span>
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#b38080]/80 max-w-lg mb-8 leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_30px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 bg-gradient-to-br from-red-600 to-rose-600"
            >
              View My Work
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#ffe5e5] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <FiMail className="w-4 h-4" />
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            {[
              { icon: FiGithub, href: siteConfig.links.github, label: 'GitHub' },
              { icon: FiLinkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
              { icon: FiMail, href: `mailto:${siteConfig.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-white/10 text-[#b38080] hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/5 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Profile Image using next/image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 48 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: DURATION.narrative, delay: 0.36, ease: EASE_SYSTEM }}
          className="hidden lg:flex justify-center items-center relative z-10"
        >
          <div className="relative group">
            <motion.div
              className="absolute -inset-6 rounded-full opacity-40 blur-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-400"
              animate={{ scale: [1, 1.05, 1], opacity: [0.34, 0.5, 0.34] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
              <Image
                src="/gaurav.png"
                alt={siteConfig.name}
                fill
                priority
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050000]/40 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-panel px-4 py-2 rounded-xl text-sm font-semibold text-red-400"
            >
              🧠 AI/ML
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 glass-panel px-4 py-2 rounded-xl text-sm font-semibold text-red-500"
            >
              ⚡ 9.1 CGPA
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#b38080]/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-red-600"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
