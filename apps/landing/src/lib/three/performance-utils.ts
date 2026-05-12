'use client'

/**
 * Performance utilities for Three.js scene management.
 * Handles device detection, pixel ratio capping, and automatic quality adjustment.
 */

export type DeviceTier = 'low' | 'medium' | 'high'

export function getDeviceTier(): DeviceTier {
  if (typeof window === 'undefined')
    return 'high'

  // Check for mobile GPU limitations
  const gpu = getGPUInfo()
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  const memory = (navigator as any).deviceMemory ?? 8

  if (isMobile || memory <= 4 || /Adreno 5|Mali-4|PowerVR/.test(gpu)) {
    return 'low'
  }

  if (memory <= 6 || /Intel HD Graphics|UHD Graphics/.test(gpu)) {
    return 'medium'
  }

  return 'high'
}

export function getMaxPixelRatio(tier: DeviceTier): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  switch (tier) {
    case 'low':
      return Math.min(dpr, 1)
    case 'medium':
      return Math.min(dpr, 1.5)
    case 'high':
      return Math.min(dpr, 2)
  }
}

export function getParticleCount(tier: DeviceTier): number {
  switch (tier) {
    case 'low':
      return 300
    case 'medium':
      return 1000
    case 'high':
      return 2000
  }
}

export function getFloatingGeometriesCount(tier: DeviceTier): number {
  switch (tier) {
    case 'low':
      return 3
    case 'medium':
      return 8
    case 'high':
      return 15
  }
}

export function shouldUsePostProcessing(tier: DeviceTier): boolean {
  return tier !== 'low'
}

export function shouldUseBloom(tier: DeviceTier): 'full' | 'light' | 'none' {
  switch (tier) {
    case 'low':
      return 'none'
    case 'medium':
      return 'light'
    case 'high':
      return 'full'
  }
}

function getGPUInfo(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string ?? ''
      }
    }
  }
  catch {
    // Silently fail
  }
  return ''
}
