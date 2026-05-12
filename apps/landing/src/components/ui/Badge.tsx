'use client'

import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'muted' | 'skill'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          default: 'bg-white/5 text-text-secondary',
          accent: 'bg-accent-muted text-accent',
          muted: 'bg-white/2 text-text-secondary border border-border',
          skill: 'bg-accent/10 text-accent border border-accent/20',
        }[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
