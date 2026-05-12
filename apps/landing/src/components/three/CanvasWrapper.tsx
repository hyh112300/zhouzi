'use client'

import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { getDeviceTier, getMaxPixelRatio } from '@/lib/three/performance-utils'
import { Scene } from './Scene'

export function CanvasWrapper() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tier, setTier] = useState<'low' | 'medium' | 'high'>('high')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTier(getDeviceTier())
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 h-screen w-screen"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        dpr={getMaxPixelRatio(tier)}
        gl={{
          antialias: tier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene tier={tier} />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  )
}
