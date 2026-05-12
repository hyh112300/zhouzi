'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface HeroSceneProps {
  tier: 'low' | 'medium' | 'high'
  reducedMotion: boolean
}

/**
 * Silent Geometry — A single, elegant geometric form.
 * Extremely minimal. Fine lines, warm glow, slow drift.
 * No particles, no floating objects, no complex shaders.
 */
export function HeroScene({ tier, reducedMotion }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  const geometry = useMemo(() => {
    const detail = tier === 'low' ? 1 : tier === 'medium' ? 2 : 3
    return new THREE.IcosahedronGeometry(1.2, detail)
  }, [tier])

  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#D4A853',
      wireframe: true,
      transparent: true,
      opacity: tier === 'low' ? 0.08 : 0.12,
    })
  }, [tier])

  const innerMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#D4A853',
      metalness: 0.9,
      roughness: 0.3,
      transparent: true,
      opacity: tier === 'low' ? 0.015 : 0.025,
      wireframe: false,
      emissive: '#D4A853',
      emissiveIntensity: tier === 'low' ? 0.02 : 0.04,
      envMapIntensity: 0.5,
    })
  }, [tier])

  const ringGeo = useMemo(() => {
    return new THREE.TorusGeometry(1.8, 0.008, 16, 64)
  }, [])

  const ringMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#D4A853',
      transparent: true,
      opacity: tier === 'low' ? 0.04 : 0.06,
    })
  }, [tier])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const speed = reducedMotion ? 0 : 1
    groupRef.current.rotation.x = Math.sin(t * 0.06 * speed) * 0.1
    groupRef.current.rotation.y = t * 0.03 * speed
    groupRef.current.rotation.z = Math.cos(t * 0.04 * speed) * 0.05
    groupRef.current.position.y = Math.sin(t * 0.15 * speed) * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* Main wireframe icosahedron */}
      <mesh geometry={geometry} material={wireframeMaterial} />

      {/* Inner ghost volume */}
      <mesh geometry={geometry} material={innerMaterial} scale={0.95} />

      {/* Outer rings */}
      <mesh
        geometry={ringGeo}
        material={ringMat}
        rotation-x={Math.PI / 3}
      />
      <mesh
        geometry={ringGeo}
        material={ringMat}
        rotation-x={-Math.PI / 3}
        rotation-y={Math.PI / 4}
      />
    </group>
  )
}
