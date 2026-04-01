'use client'

import { useEffect, useRef, useState } from 'react'

type ScrollDirection = 'up' | 'down'

export function useScrollDirection(threshold = 8): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('down')
  const lastYRef = useRef(0)
  const tickingRef = useRef(false)

  useEffect(() => {
    lastYRef.current = window.scrollY

    const updateDirection = () => {
      const currentY = window.scrollY
      const delta = currentY - lastYRef.current

      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? 'down' : 'up')
        lastYRef.current = currentY
      }

      tickingRef.current = false
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        window.requestAnimationFrame(updateDirection)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}
