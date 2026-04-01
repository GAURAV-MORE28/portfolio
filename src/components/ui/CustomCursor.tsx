'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    setIsFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const animate = useCallback(() => {
    ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.15
    ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.15

    if (dotRef.current) {
      dotRef.current.style.left = `${posRef.current.x}px`
      dotRef.current.style.top = `${posRef.current.y}px`
    }
    if (ringRef.current) {
      ringRef.current.style.left = `${ringPosRef.current.x}px`
      ringRef.current.style.top = `${ringPosRef.current.y}px`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnterInteractive = () => setIsHovering(true)
    const handleMouseLeaveInteractive = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive)
      el.addEventListener('mouseleave', handleMouseLeaveInteractive)
    })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isFinePointer, animate])

  if (!isFinePointer) return null

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-red-400 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2" 
      />
      <div 
        ref={ringRef} 
        className={`fixed top-0 left-0 border-[1.5px] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering 
            ? 'w-14 h-14 border-red-400 bg-red-400/10' 
            : 'w-9 h-9 border-red-600/50'
        }`} 
      />
    </>
  )
}
