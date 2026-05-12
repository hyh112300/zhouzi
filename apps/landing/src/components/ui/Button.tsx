'use client'

import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { Slot } from '@/lib/slot'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(
          'group relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            primary:
              'bg-accent text-bg-primary hover:bg-accent-hover active:scale-[0.98]',
            ghost:
              'text-text-secondary hover:text-text-primary hover:bg-white/5',
            outline:
              'border border-border text-text-primary hover:bg-white/5 hover:border-accent',
          }[variant],
          {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
          }[size],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
export { Button }
