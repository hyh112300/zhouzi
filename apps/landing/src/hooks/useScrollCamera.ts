'use client'

import { useScroll } from 'framer-motion'
import { useRef } from 'react'

interface CameraState {
  position: [number, number, number]
  target: [number, number, number]
}

interface ScrollCameraSegment {
  /** Scroll progress range for this segment [start, end] */
  range: [number, number]
  camera: CameraState
}

export function useScrollCamera(segments: ScrollCameraSegment[]) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const getCameraState = (progress: number): CameraState => {
    for (const segment of segments) {
      const [start, end] = segment.range
      if (progress >= start && progress <= end) {
        const t = (progress - start) / (end - start)
        return {
          position: lerpArray(segment.camera.position, segment.camera.position, t) as [number, number, number],
          target: lerpArray(segment.camera.target, segment.camera.target, t) as [number, number, number],
        }
      }
    }
    return segments[0]?.camera ?? { position: [0, 0, 8], target: [0, 0, 0] }
  }

  return {
    containerRef,
    scrollYProgress,
    getCameraState,
  }
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * easeOutCubic(t)
}

function lerpArray(a: number[], b: number[], t: number): number[] {
  return a.map((val, i) => lerp(val, b[i] ?? val, t))
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}
