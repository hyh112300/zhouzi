'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface CameraControllerProps {
  mousePosition: { x: number, y: number, nx: number, ny: number }
  scrollProgress: React.MutableRefObject<number>
  reducedMotion: boolean
}

export function CameraController({
  mousePosition,
  scrollProgress,
  reducedMotion,
}: CameraControllerProps) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    const scroll = scrollProgress.current

    // Scroll-driven camera: move back as user scrolls
    const zBase = 8 + scroll * 12
    const yBase = scroll * 1.5

    // Mouse parallax (subtle)
    const mx = reducedMotion ? 0 : mousePosition.nx * 0.3
    const my = reducedMotion ? 0 : mousePosition.ny * 0.2

    // Smooth interpolation
    targetPosition.current.set(mx, yBase + my, zBase)
    targetLookAt.current.set(mx * 0.5, yBase * 0.3 + my * 0.3, 0)

    camera.position.lerp(targetPosition.current, 0.05)
    camera.lookAt(targetLookAt.current)
  })

  return null
}
