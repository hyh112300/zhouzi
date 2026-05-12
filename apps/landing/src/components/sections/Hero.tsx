'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CanvasWrapper } from '@/components/three'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative flex h-dvh min-h-150 w-full items-center justify-center overflow-hidden bg-bg-primary">
      {/* Three.js Canvas - subtle geometric backdrop */}
      {mounted && <CanvasWrapper />}

      {/* Fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-bg-primary to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="mb-4 text-sm font-medium tracking-[0.2em] text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            前端工程师 / 创意开发者
          </motion.p>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-text-primary md:text-7xl lg:text-8xl">
            Zhouzi
          </h1>

          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            在工程、设计与创意技术的交汇处，
            打造沉浸式数字体验。
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button variant="primary" size="lg" asChild>
              <a href="#projects">查看作品</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">联系我</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-text-tertiary transition-colors hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  )
}
