'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import { resumeData } from '@/data/content'
import { DELAY, DURATION, EASE_SYSTEM, VIEWPORT_ONCE } from '@/lib/motionSystem'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-[1px] w-12 bg-red-600" />
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
        <span className="text-[#b38080] font-medium">{number}</span>{' '}
        <span className="text-[#ffe5e5]">{title}</span>
      </h2>
    </div>
  )
}

const terminalLines = [
  "> INITIALIZING PROFILE ANALYSIS...",
  "> TARGET: GAURAV MORE",
  "> STATUS: B.TECH AI/ML",
  "> CGPA: 9.1 [OPTIMAL]",
  "> DIRECTIVES: ENGINEER, OPTIMIZE, DEPLOY",
  "> LOADING EXPERTISE MODULES...",
  "> SYSTEM COMPROMISE: NEGATIVE.",
  "> ACCESS GRANTED."
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT_ONCE)
  const [lines, setLines] = useState<number>(0)

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setLines(prev => (prev < terminalLines.length ? prev + 1 : prev))
      }, 300)
      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <section id="about" className="py-24 lg:py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.narrative, ease: EASE_SYSTEM }}
        >
          <SectionHeader number="01." title="Profile Data" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal Intro */}
          <motion.div
            className="w-full bg-[#0a0000] border border-red-900/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.05)]"
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.block, delay: DELAY.column, ease: EASE_SYSTEM }}
          >
            <div className="bg-[#0f0000] px-4 py-2 border-b border-red-900/40 flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-600/50" />
               <div className="w-3 h-3 rounded-full bg-orange-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
               <span className={`${jetbrains.className} text-[#b38080] text-xs ml-2`}>gaurav_process.sh</span>
            </div>
            <div className={`${jetbrains.className} p-6 sm:p-8 text-sm sm:text-base min-h-[300px] flex flex-col gap-2`}>
               {terminalLines.slice(0, lines).map((line, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className={line.includes('GRANTED') ? "text-green-500 font-bold" : "text-red-500/90"}
                 >
                   {line}
                 </motion.div>
               ))}
               {lines < terminalLines.length && (
                 <motion.div 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="w-2.5 h-5 bg-red-600 mt-1"
                 />
               )}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="flex flex-col justify-center gap-8"
            initial={{ opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.block, delay: DELAY.cascade, ease: EASE_SYSTEM }}
          >
            <div>
              <h3 className={`${jetbrains.className} text-red-500 text-sm mb-2 uppercase tracking-wider`}>[ Who I Am ]</h3>
              <p className="text-lg text-[#b38080] leading-relaxed">
                I am an <span className="text-[#ffe5e5] font-semibold">AI/ML Engineer</span> and secure systems builder. 
                My path started with a <span className="text-red-400 font-semibold">Rank 1 Diploma in IT</span>, 
                and I am now accelerating through a B.Tech in Artificial Intelligence. I don't just write code; I design intelligent, fault-tolerant architectures.
              </p>
            </div>
            
            <div>
              <h3 className={`${jetbrains.className} text-red-500 text-sm mb-2 uppercase tracking-wider`}>[ What I Build ]</h3>
              <p className="text-lg text-[#b38080] leading-relaxed">
                From <span className="text-[#ffe5e5] font-semibold">Deep Learning interfaces</span> to rigorous data engineering pipelines, 
                I bridge the gap between raw machine logic and human-centric frontend experiences. I thrive on the boundary where data science meets polished software engineering.
              </p>
            </div>

            {/* Quick Tech Tags */}
            <div className="flex flex-wrap gap-3 mt-2">
              {['Python', 'TensorFlow', 'React', 'Next.js', 'FastAPI', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-[#b38080] hover:text-[#ffe5e5] hover:border-red-600/40 hover:bg-red-600/5 transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.block, delay: 0.42, ease: EASE_SYSTEM }}
        >
          {resumeData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, borderColor: 'rgba(220, 38, 38, 0.4)', boxShadow: '0 10px 30px -10px rgba(220, 38, 38, 0.2)' }}
              transition={{ duration: 0.2 }}
              className="glass-panel p-6 sm:p-8 text-center group cursor-default transition-all duration-300"
            >
              <h3 className="text-2xl sm:text-3xl font-heading font-bold bg-gradient-to-b from-white to-red-400 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className={`${jetbrains.className} text-xs sm:text-sm text-[#b38080] mt-3 font-medium tracking-wide`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
