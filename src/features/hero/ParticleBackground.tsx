'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DURATION, EASE_SYSTEM } from '@/lib/motionSystem'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

// Shared ParticleBackground logic, lazy loaded globally in page.tsx
export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  // Render immediately if mounted

  function Particles() {
    const meshRef = useRef<any>(null)
    const count = 1500

    const [positions, velocities, sizes] = (() => {
      const pos = new Float32Array(count * 3)
      const vel = new Float32Array(count * 3)
      const sz = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        vel[i * 3] = (Math.random() - 0.5) * 0.002
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
        sz[i] = Math.random() * 2 + 0.5
      }
      return [pos, vel, sz]
    })()

    useFrame((state: any) => {
      if (!meshRef.current) return
      const time = state.clock.getElapsedTime()
      const posArray = meshRef.current.geometry.attributes.position.array

      for (let i = 0; i < count; i++) {
        posArray[i * 3] += velocities[i * 3] + Math.sin(time * 0.1 + i) * 0.0005
        posArray[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time * 0.1 + i) * 0.0005
        posArray[i * 3 + 2] += velocities[i * 3 + 2]

        for (let j = 0; j < 3; j++) {
          if (posArray[i * 3 + j] > 10) posArray[i * 3 + j] = -10
          if (posArray[i * 3 + j] < -10) posArray[i * 3 + j] = 10
        }
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true
      meshRef.current.rotation.y = time * 0.02
      meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
    })

    return (
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#ef4444" transparent opacity={0.65} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    )
  }

  function NeuralLinks() {
    const lineRef = useRef<any>(null)

    const positions = (() => {
      const pos = new Float32Array(200 * 6)
      for (let i = 0; i < 200; i++) {
        pos[i * 6] = (Math.random() - 0.5) * 16
        pos[i * 6 + 1] = (Math.random() - 0.5) * 16
        pos[i * 6 + 2] = (Math.random() - 0.5) * 16
        pos[i * 6 + 3] = pos[i * 6] + (Math.random() - 0.5) * 3
        pos[i * 6 + 4] = pos[i * 6 + 1] + (Math.random() - 0.5) * 3
        pos[i * 6 + 5] = pos[i * 6 + 2] + (Math.random() - 0.5) * 3
      }
      return pos
    })()

    useFrame((state: any) => {
      if (!lineRef.current) return
      const time = state.clock.getElapsedTime()
      lineRef.current.rotation.y = time * 0.01
      lineRef.current.rotation.z = Math.sin(time * 0.005) * 0.05
    })

    return (
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#dc2626" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </lineSegments>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.narrative, ease: EASE_SYSTEM }}
      className="fixed inset-0 w-full h-full pointer-events-none"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }} style={{ background: 'transparent' }}>
        <Particles />
        <NeuralLinks />
        <ambientLight intensity={0.1} />
      </Canvas>
    </motion.div>
  )
}
