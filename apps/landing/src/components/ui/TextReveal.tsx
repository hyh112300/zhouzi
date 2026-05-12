'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
  stagger?: number
}

export function TextReveal({
  children,
  className,
  as: Tag = 'p',
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const { ref, inView } = useInView({ threshold: 0.2, once: true })

  const words = children.split(' ')

  const MotionTag = motion.create(Tag)

  return (
    <MotionTag
      ref={ref}
      className={cn('overflow-hidden', className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
