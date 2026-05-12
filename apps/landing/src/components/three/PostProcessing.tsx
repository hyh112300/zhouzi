'use client'

import type { ReactElement } from 'react'
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { shouldUseBloom } from '@/lib/three/performance-utils'

interface PostProcessingProps {
  tier: 'low' | 'medium' | 'high'
}

export function PostProcessing({ tier }: PostProcessingProps) {
  const bloomSetting = shouldUseBloom(tier)

  const children: ReactElement[] = []

  if (bloomSetting !== 'none') {
    children.push(
      <Bloom
        key="bloom"
        blendFunction={BlendFunction.ADD}
        intensity={bloomSetting === 'full' ? 0.3 : 0.15}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.7}
        mipmapBlur
      />,
    )
  }

  if (tier === 'high') {
    children.push(
      <DepthOfField
        key="dof"
        focusDistance={0.01}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />,
    )
  }

  return <EffectComposer>{children}</EffectComposer>
}
