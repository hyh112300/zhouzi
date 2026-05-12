'use client'

import type { HTMLAttributes } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string
  variant?: 'default' | 'alt'
}

export function Section({ id, className, variant = 'default', children, ...props }: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05, once: true })

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'px-4 py-32 md:px-8 md:py-20 lg:py-32',
        'transition-opacity duration-1000',
        inView ? 'opacity-100' : 'opacity-0',
        variant === 'alt' ? 'bg-bg-secondary' : 'bg-bg-primary',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
