'use client'

import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
}

export function Container({ className, as: Tag = 'div', children, ...props }: ContainerProps) {
  return (
    <Tag className={cn('section-container', className)} {...props}>
      {children}
    </Tag>
  )
}
