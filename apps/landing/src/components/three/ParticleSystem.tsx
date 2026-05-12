'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getParticleCount } from '@/lib/three/performance-utils'
import { particleFragmentShader, particleVertexShader } from '@/lib/three/shaders'

interface ParticleSystemProps {
  uniforms: {
    uTime: { value: number }
    uScrollProgress: { value: number }
  }
  tier: 'low' | 'medium' | 'high'
  reducedMotion: boolean
}

export function ParticleSystem({ uniforms, tier, reducedMotion }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = getParticleCount(tier)

  const { positions, colors, sizes, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const off = new Float32Array(count)

    const goldBase = new THREE.Color('#D4A853')
    const goldLight = new THREE.Color('#E8C06A')
    const white = new THREE.Color('#F5F5F0')

    for (let i = 0; i < count; i++) {
      // Spherical distribution with variation
      const radius = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.cos(phi) * (Math.random() * 0.5 + 0.75)
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      // Color gradient: mostly gold tones
      const colorMix = Math.random()
      const c = goldBase.clone().lerp(colorMix > 0.7 ? white : goldLight, colorMix)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      // Size variation
      siz[i] = 2 + Math.random() * 6

      // Offset for animation
      off[i] = Math.random() * Math.PI * 2
    }

    return { positions: pos, colors: col, sizes: siz, offsets: off }
  }, [count])

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: uniforms.uTime,
        uScrollProgress: uniforms.uScrollProgress,
        uTexture: { value: createSpriteTexture() },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [uniforms.uTime, uniforms.uScrollProgress])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1))
    return geo
  }, [positions, colors, sizes, offsets])

  if (reducedMotion) {
    shaderMaterial.uniforms.uTime.value = 0
  }

  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} />
  )
}

function createSpriteTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
