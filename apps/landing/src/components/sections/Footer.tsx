'use client'

import { Github, Rss } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright & ICP */}
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
            <p className="text-xs text-text-secondary/40">
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              {SITE.author}
              .
              {' '}
              {SITE.icp}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary/40 transition-colors hover:text-text-secondary"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="/blog/feed.xml"
              className="text-text-secondary/40 transition-colors hover:text-text-secondary"
              aria-label="RSS Feed"
            >
              <Rss className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
