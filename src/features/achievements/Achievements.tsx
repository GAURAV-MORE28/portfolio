'use client'

import { motion } from 'framer-motion'
import { resumeData } from '@/data/content'
import { JetBrains_Mono } from 'next/font/google'
import { HiOutlineTrophy, HiOutlineAcademicCap, HiOutlineStar, HiOutlineDocumentCheck } from 'react-icons/hi2'
import { useScrollDirection } from '@/lib/useScrollDirection'
import { DELAY, DURATION, EASE_SYSTEM, VIEWPORT_NARRATIVE, enterY } from '@/lib/motionSystem'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

const iconMapRecord: Record<number, any> = {
  0: HiOutlineTrophy,
  1: HiOutlineAcademicCap,
  2: HiOutlineStar,
  3: HiOutlineDocumentCheck
}

export default function Achievements() {
  const scrollDirection = useScrollDirection()

  return (
    <section id="achievements" className="py-24 lg:py-32 px-6">
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
            <span className="text-[#b38080] font-medium">05.</span>{' '}
            <span className="text-[#ffe5e5]">System Milestones</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumeData.achievements.map((item, index) => {
            const Icon = iconMapRecord[index % 4]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={VIEWPORT_NARRATIVE}
                transition={{ duration: DURATION.item, delay: index * DELAY.stagger, ease: EASE_SYSTEM }}
                whileHover={{ y: -6 }}
                className="relative group h-full"
              >
                {/* Floating motion card acting like a game achievement */}
                <div className="absolute inset-0 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative h-full glass-panel p-6 bg-[#0a0000]/90 border border-red-900/40 rounded-2xl flex flex-col items-center text-center overflow-hidden transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-[#0f0000]">
                  
                  {/* Top achievement banner */}
                  <div className="w-full absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 group-hover:opacity-100" />

                  {/* Icon Hex / Shield */}
                  <div className="w-16 h-16 rounded-xl bg-red-900/20 border border-red-500/30 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]">
                    <Icon className="w-8 h-8 text-red-500" />
                  </div>

                  <span className={`${jetbrains.className} text-[10px] sm:text-xs font-bold text-red-400 mb-3 px-3 py-1 bg-red-900/20 rounded-full border border-red-900/50 uppercase tracking-widest`}>
                    Achievement Unlocked
                  </span>

                  <h3 className="text-lg font-heading font-bold text-[#ffe5e5] leading-tight mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-[#b38080] leading-relaxed mb-4 flex-grow">
                    {item.description}
                  </p>
                  
                  <div className={`${jetbrains.className} w-full flex justify-between items-center pt-4 border-t border-red-900/30 mt-auto`}>
                     <span className="text-[#805555] text-xs">LOG_DATE:</span>
                     <span className="text-red-500/80 text-xs">{item.date}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
