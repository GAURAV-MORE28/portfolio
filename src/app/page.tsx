import dynamic from 'next/dynamic'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import ParticleBackground from '@/features/hero/ParticleBackground'
import Hero from '@/features/hero/Hero'

const About = dynamic(() => import('@/features/about/About'))
const Experience = dynamic(() => import('@/features/experience/Experience'))
const Projects = dynamic(() => import('@/features/projects/Projects'))
const Skills = dynamic(() => import('@/features/skills/Skills'))
const Achievements = dynamic(() => import('@/features/achievements/Achievements'))
const Contact = dynamic(() => import('@/features/contact/Contact'))

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </>
  )
}
