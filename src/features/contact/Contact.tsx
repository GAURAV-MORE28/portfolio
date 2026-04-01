'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi'
import { siteConfig } from '@/data/content'
import { useScrollDirection } from '@/lib/useScrollDirection'
import { DELAY, DURATION, EASE_SYSTEM, VIEWPORT_NARRATIVE, enterY } from '@/lib/motionSystem'

export default function Contact() {
  const scrollDirection = useScrollDirection()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' }
    let isValid = true

    if (!formData.name.trim()) { newErrors.name = 'Required'; isValid = false }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required'; isValid = false
    }
    if (!formData.message.trim()) { newErrors.message = 'Required'; isValid = false }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return (
    <section id="contact" className="py-24 lg:py-32 px-6">
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
            <span className="text-[#b38080] font-medium">06.</span>{' '}
            <span className="text-[#ffe5e5]">Get in Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-2 flex flex-col justify-between"
            initial={{ opacity: 0, x: scrollDirection === 'down' ? -28 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_NARRATIVE}
            transition={{ duration: DURATION.block, delay: DELAY.column, ease: EASE_SYSTEM }}
          >
            <div>
              <h3 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                Let's build the <span className="text-gradient">future</span> together.
              </h3>
              <p className="text-[#b38080] leading-relaxed mb-8">
                I'm currently open for internships, collaborative projects, and compelling opportunities in AI engineering and software development. My inbox is always open.
              </p>

              <div className="space-y-4 mb-8">
                <button 
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto flex items-center gap-3 text-[#b38080] hover:text-[#ffe5e5] transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl border border-white/5 group-hover:border-red-600/50 group-hover:bg-red-600/10 transition-all shadow-none group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]"><FiMail className="w-4 h-4" /></div>
                  <span className="text-sm">{copied ? 'Copied to clipboard!' : siteConfig.email}</span>
                </button>
                <div className="flex items-center gap-3 text-[#b38080] group">
                  <div className="p-2.5 rounded-xl border border-white/5 transition-all"><FiMapPin className="w-4 h-4" /></div>
                  <span className="text-sm">{siteConfig.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {[
                  { icon: FiGithub, label: 'GitHub', href: siteConfig.links.github },
                  { icon: FiLinkedin, label: 'LinkedIn', href: siteConfig.links.linkedin }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 rounded-xl border border-white/5 text-[#b38080] hover:text-red-400 hover:border-red-500/50 hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: scrollDirection === 'down' ? 28 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_NARRATIVE}
            transition={{ duration: DURATION.block, delay: DELAY.cascade, ease: EASE_SYSTEM }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={`w-full px-4 py-3 rounded-xl bg-[#050000]/60 border ${errors.name ? 'border-red-500' : 'border-white/5'} text-[#ffe5e5] placeholder-[#805555] text-sm focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all`} />
                </div>
                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className={`w-full px-4 py-3 rounded-xl bg-[#050000]/60 border ${errors.email ? 'border-red-500' : 'border-white/5'} text-[#ffe5e5] placeholder-[#805555] text-sm focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all`} />
                </div>
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Project details or opportunity..." rows={5} className={`w-full px-4 py-3 rounded-xl bg-[#050000]/60 border ${errors.message ? 'border-red-500' : 'border-white/5'} text-[#ffe5e5] placeholder-[#805555] text-sm focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all resize-none`} />
              </div>
              <button 
                disabled={submitted} 
                type="submit" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50" 
                style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)', boxShadow: '0 6px 30px rgba(220,38,38,0.2)' }}
              >
                {submitted ? 'Message Sent!' : <><FiSend className="w-4 h-4" /> {submitted ? 'Sending...' : 'Send Message'}</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
