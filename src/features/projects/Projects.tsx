'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { projects } from '@/data/content'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { JetBrains_Mono } from 'next/font/google'
import { useScrollDirection } from '@/lib/useScrollDirection'
import { DELAY, DURATION, EASE_SYSTEM, EASE_SNAP, VIEWPORT_NARRATIVE, enterY } from '@/lib/motionSystem'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const scrollDirection = useScrollDirection()

  return (
    <section id="projects" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: enterY(scrollDirection) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_NARRATIVE}
          transition={{ duration: DURATION.narrative, ease: EASE_SYSTEM }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-[1px] w-12 bg-red-600" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
            <span className="text-[#b38080] font-medium">03.</span>{' '}
            <span className="text-[#ffe5e5]">Featured Solutions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <ProjectCard
                key={project.title}
                project={project}
                isEven={isEven}
                index={index}
                onOpen={() => setSelectedProject(project)}
              />
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm p-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.micro, ease: EASE_SYSTEM }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.article
              layoutId={selectedProject.title}
              className="w-full max-w-4xl rounded-2xl border border-red-800/40 bg-[#080000]/95 overflow-hidden"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: DURATION.modal, ease: EASE_SNAP }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-72">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050000] to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#ffe5e5] mb-4">{selectedProject.title}</h3>
                <p className="text-[#b38080] leading-relaxed mb-5">{selectedProject.description}</p>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech) => (
                    <li key={tech} className={`${jetbrains.className} text-xs px-2 py-1 border border-red-900/30 rounded text-red-400/80`}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-red-700/40 text-red-300 hover:bg-red-900/20 transition-colors duration-300">
                    GitHub
                  </a>
                  {selectedProject.link !== '#' && (
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-red-700/40 text-red-300 hover:bg-red-900/20 transition-colors duration-300">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  isEven,
  index,
  onOpen,
}: {
  project: (typeof projects)[number]
  isEven: boolean
  index: number
  onOpen: () => void
}) {
  const cardRef = useRef(null)
  const scrollDirection = useScrollDirection()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: opacityFade }}
      initial={{ opacity: 0, y: enterY(scrollDirection, 26) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_NARRATIVE}
      transition={{ duration: DURATION.item, delay: index * DELAY.stagger, ease: EASE_SYSTEM }}
      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center group`}
    >
      <motion.button
        layoutId={project.title}
        onClick={onOpen}
        className="w-full lg:w-3/5 h-[300px] sm:h-[400px] lg:h-[450px] relative rounded-2xl overflow-hidden border border-red-900/40 bg-[#0a0000] cursor-pointer text-left"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050000]/75 via-transparent to-[#050000]/25 opacity-70 group-hover:opacity-95 transition-opacity duration-500 z-10" />
        <motion.div style={{ y: yParallax }} className="absolute -inset-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 brightness-80 group-hover:scale-[1.05] group-hover:brightness-100"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-6 left-6 right-6 z-20"
          initial={{ y: 18, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: DURATION.micro, ease: EASE_SYSTEM }}
        >
          <p className="text-red-300 text-sm">Open cinematic project view</p>
        </motion.div>
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-600/50 z-20 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-600/50 z-20 pointer-events-none" />
      </motion.button>

      <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} relative z-30 pointer-events-none`}>
        <div className="pointer-events-auto">
          <p className={`${jetbrains.className} text-red-500 text-sm mb-2`}>Featured Project 0{index + 1}</p>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#ffe5e5] mb-6 group-hover:text-red-400 transition-colors duration-300">
            {project.title}
          </h3>

          <div className="glass-panel p-6 sm:p-8 bg-[#0a0000]/95 backdrop-blur-xl border-red-900/30 shadow-2xl mb-6 relative">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-red-600 pointer-events-none" />
            <motion.p
              initial={{ y: 10, opacity: 0.85 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: DURATION.micro, ease: EASE_SYSTEM }}
              className="text-[#b38080] leading-relaxed relative z-10 text-sm sm:text-base"
            >
              {project.description}
            </motion.p>
          </div>

          <ul className={`flex flex-wrap gap-3 mb-8 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
            {project.tech.map((tech) => (
              <li key={tech} className={`${jetbrains.className} text-xs font-medium text-red-400/80 px-2 py-1 bg-red-900/10 rounded border border-red-900/30`}>
                {tech}
              </li>
            ))}
          </ul>

          <div className={`flex items-center gap-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-[#b38080] hover:text-red-400 hover:border-red-600/50 hover:bg-red-600/10 transition-all duration-300 hover:-translate-y-1"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            {project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-[#b38080] hover:text-red-400 hover:border-red-600/50 hover:bg-red-600/10 transition-all duration-300 hover:-translate-y-1"
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
