'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { resumeData } from '@/data/content'
import { JetBrains_Mono } from 'next/font/google'
import { FiTarget, FiLock, FiCpu, FiActivity } from 'react-icons/fi'
import { useScrollDirection } from '@/lib/useScrollDirection'
import { DURATION, EASE_SYSTEM, VIEWPORT_NARRATIVE, enterY } from '@/lib/motionSystem'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

const missionIcons = [FiCpu, FiTarget, FiLock, FiActivity]
const missionColors = ['#dc2626', '#ef4444', '#f97316', '#fb7185']

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const nodesRef = useRef<Array<HTMLElement | null>>([])
  const [activeNode, setActiveNode] = useState(0)
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sectionEl = sectionRef.current
    const lineEl = lineRef.current

    if (!sectionEl || !lineEl) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineEl,
        { scaleY: 0, transformOrigin: 'top top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 70%',
            end: 'bottom 34%',
            scrub: 0.92,
          },
        }
      )

      nodesRef.current.forEach((node, index) => {
        if (!node) return
        ScrollTrigger.create({
          trigger: node,
          start: 'top 70%',
          end: 'bottom 36%',
          onEnter: () => {
            gsap.to(node, { autoAlpha: 1, scale: 1, y: 0, duration: 0.42, ease: 'power3.out' })
            setActiveNode(index)
          },
          onLeaveBack: () => {
            gsap.to(node, { autoAlpha: 0.45, scale: 0.97, y: -6, duration: 0.3, ease: 'power3.inOut' })
            setActiveNode(Math.max(0, index - 1))
          },
        })
      })
    }, sectionEl)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="py-24 lg:py-32 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: enterY(scrollDirection) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_NARRATIVE}
          transition={{ duration: DURATION.narrative, ease: EASE_SYSTEM }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-[1px] w-12 bg-red-600" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
            <span className="text-[#b38080] font-medium">02.</span>{' '}
            <span className="text-[#ffe5e5]">Mission Logs</span>
          </h2>
        </motion.div>

        <div className="relative pl-10 sm:pl-16">
          <div className="absolute top-0 bottom-0 left-3 sm:left-8 w-[2px] bg-red-950/90" />
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-3 sm:left-8 w-[2px] bg-gradient-to-b from-red-500 via-red-600 to-rose-500 origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          {resumeData.experience.map((exp, index) => {
            const color = missionColors[index % missionColors.length]
            const Icon = missionIcons[index % missionIcons.length]
            const isActive = activeNode === index

            return (
              <motion.article
                key={exp.title}
                ref={(el) => {
                  nodesRef.current[index] = el
                }}
                initial={{ opacity: 0.45, scale: 0.97, y: 8 }}
                animate={{
                  y: 0,
                  scale: isActive ? 1.015 : 1,
                  boxShadow: isActive
                    ? '0 0 36px rgba(220,38,38,0.18)'
                    : '0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.42, ease: EASE_SYSTEM }}
                className="group relative mb-10 last:mb-0"
              >
                <div
                  className="absolute left-[-2.35rem] sm:left-[-2.55rem] top-9 w-6 h-6 rounded-full border-2 bg-[#090000] flex items-center justify-center transition-transform duration-300"
                  style={{
                    borderColor: isActive ? '#ef4444' : '#7f1d1d',
                    transform: `scale(${isActive ? 1.16 : 1})`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>

                <div className="h-full glass-panel border border-red-900/30 bg-[#0a0000]/80 p-8 cursor-default flex flex-col relative overflow-hidden transition-all duration-500 hover:border-red-600/40 hover:bg-[#0f0000]/90">
                  <div className="mb-8 flex justify-between items-start">
                    <div className="w-12 h-12 rounded bg-red-900/10 border border-red-600/20 flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <span className={`${jetbrains.className} text-xs font-semibold px-3 py-1 bg-red-900/20 text-red-500 rounded border border-red-900/30`}>
                      {exp.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#ffe5e5] mb-2 group-hover:text-red-400 transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <h4 className={`${jetbrains.className} text-sm font-medium mb-6`} style={{ color }}>
                    @ {exp.company}
                  </h4>

                  <div className="mt-auto pt-6 border-t border-red-900/20 relative">
                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-red-600/50" />
                    <ul className="space-y-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {exp.points.map((point, j) => (
                        <li key={j} className="flex gap-3 text-[#b38080] text-sm leading-relaxed font-medium">
                          <span className="shrink-0 mt-1.5 text-red-500 font-bold text-xs">{'>'}</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`${jetbrains.className} absolute bottom-2 right-4 text-[10px] text-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}>
                    SYS.LOG.{index + 1} | AUTH: VALID
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
