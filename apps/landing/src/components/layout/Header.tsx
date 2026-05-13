'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_ITEMS, SITE, SOCIAL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500 border-b',
          isScrolled
            ? 'glass shadow-sm'
            : 'bg-transparent border-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-text-primary transition-colors hover:text-accent"
          >
            {SITE.author}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                {item.href.startsWith('/') && item.href !== '/blog'
                  ? (
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {item.label}
                      </Link>
                    )
                  : (
                      <a
                        href={item.href}
                        className="rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {item.label}
                      </a>
                    )}
              </li>
            ))}
            <li>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noreferrer"
                className="ml-2 flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 flex items-center md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu - outside header to avoid backdrop-filter containment */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-primary/95 backdrop-blur-xl md:hidden"
        >
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-2xl font-medium text-text-primary transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMobileOpen(false)}
            className="mt-4 flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
          >
            GitHub
            {' '}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      )}
    </>
  )
}
