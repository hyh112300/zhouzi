'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { centralFragmentShader, centralVertexShader } from '@/lib/three/shaders'

interface CentralStructureProps {
  uniforms: {
    uTime: { value: number }
    uScrollProgress: { value: number }
    uMouse: { value: THREE.Vector2 }
  }
  tier: 'low' | 'medium' | 'high'
  reducedMotion: boolean
}

export function CentralStructure({ uniforms, tier, reducedMotion }: CentralStructureProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const rotationSpeed = reducedMotion ? 0.05 : 0.15

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: centralVertexShader,
      fragmentShader: centralFragmentShader,
      uniforms: {
        uTime: uniforms.uTime,
        uDistort: { value: 0.3 },
        uScrollProgress: uniforms.uScrollProgress,
        uColor1: { value: new THREE.Color('#D4A853') },
        uColor2: { value: new THREE.Color('#8B6B3D') },
      },
      transparent: true,
      wireframe: tier === 'low',
      side: THREE.DoubleSide,
    })
  }, [tier, uniforms.uTime, uniforms.uScrollProgress])

  const geometry = useMemo(() => {
    return new THREE.TorusKnotGeometry(
      tier === 'low' ? 0.8 : 1.0,
      tier === 'low' ? 0.25 : 0.35,
      tier === 'low' ? 64 : 128,
      tier === 'low' ? 8 : 16,
    )
  }, [tier])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.005
      meshRef.current.rotation.y += rotationSpeed * 0.01
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={shaderMaterial} />
  )
}
