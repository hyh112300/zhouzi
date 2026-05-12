'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export function AnimatedNumber({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [current, setCurrent] = useState(from)
  const startTime = useRef<number>(0)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!isInView)
      return

    const animate = (timestamp: number) => {
      if (!startTime.current)
        startTime.current = timestamp
      const elapsed = (timestamp - startTime.current) / 1000
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3
      setCurrent(from + (to - from) * eased)

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  )
}
