'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface StaggerTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
  stagger?: number
  type?: 'words' | 'chars' | 'lines'
}

export function StaggerText({
  children,
  className,
  as: Tag = 'p',
  delay = 0,
  stagger = 0.04,
  type = 'words',
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const items = type === 'chars' ? children.split('') : children.split(' ')

  const MotionTag = motion.create(Tag)

  return (
    <MotionTag ref={ref} className={cn('overflow-hidden', className)}>
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item}
            {type !== 'chars' && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
