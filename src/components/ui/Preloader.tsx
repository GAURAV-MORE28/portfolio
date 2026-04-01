'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JetBrains_Mono } from 'next/font/google'
import { DURATION, EASE_SNAP } from '@/lib/motionSystem'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

const terminalLines = [
  'Initializing Gaurav.system...',
  'Loading AI/ML modules...',
  'Connecting to GitHub API...',
  'Running dev environment...',
  'Compiling intelligence...',
  'Launching portfolio...',
]

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('preloader_shown')
  })
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [flickerOn, setFlickerOn] = useState(false)
  const totalChars = useMemo(
    () => terminalLines.reduce((acc, line) => acc + line.length, 0),
    []
  )

  useEffect(() => {
    if (!isLoading) return
    if (lineIndex >= terminalLines.length) {
      const shutdownDelay = setTimeout(() => {
        setProgress(100)
        sessionStorage.setItem('preloader_shown', 'true')
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(shutdownDelay)
    }

    const currentLine = terminalLines[lineIndex]
    if (charIndex <= currentLine.length) {
      const variableSpeed = 18 + Math.random() * 32
      const typingTimeout = window.setTimeout(() => {
        const nextVisible = currentLine.slice(0, charIndex)
        setVisibleLines((prev) => {
          const updated = [...prev]
          updated[lineIndex] = nextVisible
          return updated
        })
        const charsTypedSoFar =
          terminalLines.slice(0, lineIndex).join('').length + charIndex
        setProgress(Math.min(96, (charsTypedSoFar / totalChars) * 100))
        setCharIndex((prev) => prev + 1)
      }, variableSpeed)
      return () => clearTimeout(typingTimeout)
    }

    const lineBreakPause = window.setTimeout(() => {
      setLineIndex((prev) => prev + 1)
      setCharIndex(0)
    }, 90)
    return () => clearTimeout(lineBreakPause)
  }, [charIndex, isLoading, lineIndex, totalChars])

  useEffect(() => {
    if (!isLoading) return
    const flickerInterval = window.setInterval(() => {
      if (Math.random() > 0.75) {
        setFlickerOn(true)
        window.setTimeout(() => setFlickerOn(false), 50)
      }
    }, 220)

    return () => clearInterval(flickerInterval)
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: DURATION.modal, ease: EASE_SNAP }}
          className="fixed inset-0 z-[99999] bg-[#020000] flex items-center justify-center px-6"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ opacity: flickerOn ? 0.28 : 0.18 }}
              transition={{ duration: 0.08 }}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(180deg, rgba(220,38,38,0.12) 0px, rgba(220,38,38,0.12) 1px, transparent 2px, transparent 4px)',
              }}
            />
          </div>

          <div className={`${jetbrains.className} relative z-10 w-full max-w-3xl border border-red-900/40 rounded-xl bg-[#060000]/85 backdrop-blur-md shadow-[0_0_60px_rgba(220,38,38,0.1)]`}>
            <div className="px-4 py-3 border-b border-red-900/40 flex items-center justify-between text-xs text-red-400/80">
              <span>gaurav@system:~</span>
              <span>BOOT_SEQUENCE</span>
            </div>

            <div className="px-5 py-6 min-h-[240px] sm:min-h-[260px]">
              <div className="space-y-2 text-red-500/90 text-sm sm:text-base">
                {visibleLines.map((msg, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-red-600">{'>'}</span>
                    <span>{msg}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-red-600">{'>'}</span>
                  <motion.span
                    className="inline-block w-2 h-4 bg-red-500"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="h-2 rounded-full bg-red-950/70 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-700 to-red-500 origin-left"
                    style={{ scaleX: progress / 100 }}
                  />
                </div>
                <div className="mt-2 text-xs text-red-400/70">
                  Executing modules... {Math.round(progress)}%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
