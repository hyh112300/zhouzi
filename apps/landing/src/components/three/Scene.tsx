'use client'

import type { DeviceTier } from '@/lib/three/performance-utils'
import { useFrame } from '@react-three/fiber'
import {
  useScroll,
} from 'framer-motion'
import { useRef } from 'react'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { shouldUsePostProcessing } from '@/lib/three/performance-utils'
import { CameraController } from './CameraController'
import { HeroScene } from './HeroScene'
import { Lighting } from './Lighting'
import { PostProcessing } from './PostProcessing'

interface SceneProps {
  tier: DeviceTier
}

export function Scene({ tier }: SceneProps) {
  const mousePos = useMousePosition()
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef(0)
  const timeRef = useRef(0)
  const usePostProcessing = shouldUsePostProcessing(tier)

  // Track scroll progress
  const { scrollYProgress } = useScroll()
  scrollYProgress.on('change', (v) => {
    scrollRef.current = v
  })

  // Animation loop for uniforms
  useFrame((_state, delta) => {
    timeRef.current += delta
  })

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  })

  // Update uniforms
  useFrame(() => {
    const u = uniformsRef.current
    u.uTime.value = timeRef.current
    u.uScrollProgress.value = scrollRef.current
    u.uMouse.value.set(mousePos.nx, mousePos.ny)
  })

  return (
    <>
      <CameraController
        mousePosition={mousePos}
        scrollProgress={scrollRef}
        reducedMotion={reducedMotion}
      />
      <Lighting />
      <HeroScene
        uniforms={uniformsRef.current}
        tier={tier}
        mousePosition={mousePos}
        reducedMotion={reducedMotion}
      />
      {usePostProcessing && <PostProcessing tier={tier} />}
    </>
  )
}
