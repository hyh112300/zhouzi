'use client'

import type * as THREE from 'three'
import { CentralStructure } from './CentralStructure'
import { FloatingGeometries } from './FloatingGeometry'
import { ParticleSystem } from './ParticleSystem'

interface HeroSceneProps {
  uniforms: {
    uTime: { value: number }
    uScrollProgress: { value: number }
    uMouse: { value: THREE.Vector2 }
  }
  tier: 'low' | 'medium' | 'high'
  mousePosition: { x: number, y: number, nx: number, ny: number }
  reducedMotion: boolean
}

export function HeroScene({ uniforms, tier, reducedMotion }: HeroSceneProps) {
  return (
    <group>
      <CentralStructure
        uniforms={uniforms}
        tier={tier}
        reducedMotion={reducedMotion}
      />
      <ParticleSystem
        uniforms={uniforms}
        tier={tier}
        reducedMotion={reducedMotion}
      />
      <FloatingGeometries
        tier={tier}
        reducedMotion={reducedMotion}
      />
    </group>
  )
}
