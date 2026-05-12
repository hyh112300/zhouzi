'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getFloatingGeometriesCount } from '@/lib/three/performance-utils'

interface FloatingGeometryProps {
  tier: 'low' | 'medium' | 'high'
  reducedMotion: boolean
}

function FloatingMesh({
  geometry,
  position,
  rotationSpeed,
  floatSpeed,
  phase,
}: {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  rotationSpeed: number
  floatSpeed: number
  phase: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialY = position[1]

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.rotation.x += rotationSpeed * 0.01
      meshRef.current.rotation.y += rotationSpeed * 0.015
      meshRef.current.position.y = initialY + Math.sin(t * floatSpeed + phase) * 0.3
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
    >
      <meshPhysicalMaterial
        color="#D4A853"
        wireframe
        transparent
        opacity={0.4}
        metalness={0.3}
        roughness={0.7}
        emissive="#D4A853"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

export function FloatingGeometries({ tier, reducedMotion }: FloatingGeometryProps) {
  const count = getFloatingGeometriesCount(tier)

  const geometries = useMemo(() => {
    const geos: { type: string, params: number[] }[] = []
    const types = [
      { type: 'IcosahedronGeometry', params: [0.2, 0] },
      { type: 'OctahedronGeometry', params: [0.25, 0] },
      { type: 'DodecahedronGeometry', params: [0.2, 0] },
      { type: 'TetrahedronGeometry', params: [0.3, 0] },
    ]

    for (let i = 0; i < count; i++) {
      geos.push(types[i % types.length]!)
    }
    return geos
  }, [count])

  const instances = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + Math.random() * 2.5
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotationSpeed: 0.5 + Math.random() * 1.5,
        floatSpeed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      }
    })
  }, [count])

  return (
    <group>
      {instances.map((inst, i) => {
        const geoType = geometries[i]!
        let geometry: THREE.BufferGeometry

        switch (geoType.type) {
          case 'IcosahedronGeometry':
            geometry = new THREE.IcosahedronGeometry(...(geoType.params as [number, number]))
            break
          case 'OctahedronGeometry':
            geometry = new THREE.OctahedronGeometry(...(geoType.params as [number, number]))
            break
          case 'DodecahedronGeometry':
            geometry = new THREE.DodecahedronGeometry(...(geoType.params as [number, number]))
            break
          default:
            geometry = new THREE.TetrahedronGeometry(...(geoType.params as [number, number]))
        }

        return (
          <FloatingMesh
            key={i}
            geometry={geometry}
            position={inst.position}
            rotationSpeed={reducedMotion ? 0 : inst.rotationSpeed}
            floatSpeed={reducedMotion ? 0 : inst.floatSpeed}
            phase={inst.phase}
          />
        )
      })}
    </group>
  )
}
