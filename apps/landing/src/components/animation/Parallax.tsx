'use client'

import type { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  /** 0-1, how much of the viewport to track */
  range?: [number, number]
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  range = [0, 1],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, range, [speed * 100, -speed * 100])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
