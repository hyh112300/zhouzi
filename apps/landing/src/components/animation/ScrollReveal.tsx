'use client'

import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  delay?: number
  distance?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  duration = 0.7,
  delay = 0,
  distance = 40,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const margin = `-${(1 - threshold) * 100}px` as const
  const isInView = useInView(ref, { once, margin } as any)

  const directionVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{
          opacity: 0,
          ...directionVariants[direction],
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, ...directionVariants[direction] }
        }
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
