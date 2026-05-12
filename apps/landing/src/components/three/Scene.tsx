'use client'

import type { DeviceTier } from '@/lib/three/performance-utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { HeroScene } from './HeroScene'

interface SceneProps {
  tier: DeviceTier
}

export function Scene({ tier }: SceneProps) {
  const reducedMotion = useReducedMotion()

  return (
    <>
      {/* Very dim ambient to barely illuminate the form */}
      <ambientLight intensity={0.05} color="#404060" />

      {/* Single warm accent light grazing the geometry */}
      <directionalLight
        position={[2, 3, 4]}
        intensity={0.15}
        color="#D4A853"
      />

      <HeroScene
        tier={tier}
        reducedMotion={reducedMotion}
      />
    </>
  )
}
