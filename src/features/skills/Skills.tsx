'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '@/data/content'
import { JetBrains_Mono } from 'next/font/google'
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiFastapi, SiFlask, SiStreamlit, SiDocker, SiGithub,
  SiTensorflow, SiScikitlearn, SiKalilinux, SiC, SiHtml5, SiCss,
  SiPostgresql, SiMongodb
} from 'react-icons/si'
import { FaJava, FaDatabase } from 'react-icons/fa'
import { HiOutlineCommandLine, HiOutlineShieldCheck } from 'react-icons/hi2'
import { IconType } from 'react-icons'
import { useScrollDirection } from '@/lib/useScrollDirection'
import { DURATION, EASE_SYSTEM, VIEWPORT_NARRATIVE, enterY } from '@/lib/motionSystem'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

const iconMap: Record<string, IconType> = {
  Python: SiPython,
  Java: FaJava,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  SQL: FaDatabase,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  C: SiC,
  TensorFlow: SiTensorflow,
  'Scikit-learn': SiScikitlearn,
  NLP: HiOutlineCommandLine,
  React: SiReact,
  'Next.js': SiNextdotjs,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  Streamlit: SiStreamlit,
  'Git & GitHub': SiGithub,
  Docker: SiDocker,
  'Burp Suite': HiOutlineShieldCheck,
  'Kali Linux': SiKalilinux,
  'API Security': HiOutlineShieldCheck,
}

const allSkills = skills.flatMap(s => s.items).map(item => {
  const cat = skills.find(c => c.items.includes(item))?.category || 'Tools'
  return { name: item, category: cat }
})

export default function Skills() {
  const scrollDirection = useScrollDirection()
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const categories = ['All', ...skills.map(s => s.category)]
  const filteredSkills = activeFilter === 'All' ? allSkills : allSkills.filter(s => s.category === activeFilter)

  return (
    <section id="skills" className="py-24 lg:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: enterY(scrollDirection) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_NARRATIVE}
          transition={{ duration: DURATION.narrative, ease: EASE_SYSTEM }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-[1px] w-12 bg-red-600" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
            <span className="text-[#b38080] font-medium">04.</span>{' '}
            <span className="text-[#ffe5e5]">Skill Arsenal</span>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: enterY(scrollDirection, 18) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_NARRATIVE}
          transition={{ duration: DURATION.block, delay: 0.1, ease: EASE_SYSTEM }}
          className="flex flex-wrap gap-2 sm:gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === cat 
                  ? 'bg-red-600/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                  : 'bg-transparent text-[#b38080] border-white/5 hover:border-red-900/50 hover:text-[#ffe5e5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Skills Grid */}
        <motion.div layout className="flex flex-wrap gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = iconMap[skill.name] || HiOutlineCommandLine
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: DURATION.micro, ease: EASE_SYSTEM }}
                  key={skill.name}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-[#0a0000] hover:border-red-500/40 hover:bg-[#0f0000] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300 w-[110px] h-[100px] sm:w-[130px] sm:h-[120px] cursor-pointer"
                >
                   {/* Hover Glow Background */}
                   <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-500 rounded-xl" />
                   
                   <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-[#b38080] group-hover:text-red-400 transition-colors duration-300 relative z-10 group-hover:-translate-y-1 transform" />
                   
                   <span className={`${jetbrains.className} text-xs font-medium text-center text-[#805555] group-hover:text-[#ffe5e5] transition-colors relative z-10`}>
                     {skill.name}
                   </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
