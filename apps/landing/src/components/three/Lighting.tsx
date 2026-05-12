'use client'

import type * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Lighting() {
  const pointLightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (pointLightRef.current) {
      // Gentle orbiting light
      const t = clock.getElapsedTime() * 0.2
      pointLightRef.current.position.x = Math.sin(t) * 3
      pointLightRef.current.position.z = Math.cos(t) * 3
      pointLightRef.current.position.y = Math.sin(t * 0.7) * 1.5 + 1
    }
  })

  return (
    <>
      {/* Ambient fill - subdued */}
      <ambientLight intensity={0.15} color="#404060" />

      {/* Key light - warm gold, much softer */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={0.4}
        color="#D4A853"
        castShadow={false}
      />

      {/* Rim light - cool blue for contrast */}
      <directionalLight
        position={[-3, 0, -5]}
        intensity={0.2}
        color="#6080C0"
      />

      {/* Dynamic accent light - very subtle */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        intensity={0.2}
        color="#D4A853"
        distance={10}
        decay={2}
      />

      {/* Bottom fill to reduce harsh shadows */}
      <directionalLight
        position={[0, -5, 2]}
        intensity={0.2}
        color="#406080"
      />
    </>
  )
}
