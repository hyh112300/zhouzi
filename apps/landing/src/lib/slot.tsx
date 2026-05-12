'use client'

import type { ReactNode } from 'react'
import { cloneElement, forwardRef, isValidElement } from 'react'

interface SlotProps {
  children: ReactNode
  [key: string]: any
}

/**
 * Radix-inspired Slot component for polymorphic components.
 * Merges props onto a single child element.
 */
const Slot = forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  if (!isValidElement(children)) {
    return null
  }

  return cloneElement(children, {
    ...props,
    // @ts-expect-error - ref forwarding
    ref,
  })
})

Slot.displayName = 'Slot'
export { Slot }
export type { SlotProps }
