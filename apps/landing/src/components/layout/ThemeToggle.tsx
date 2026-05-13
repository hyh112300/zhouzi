'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="rounded-md p-2 text-text-secondary transition-colors hover:text-text-primary"
      aria-label={theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'}
    >
      {theme === 'dark'
        ? <Sun className="h-4 w-4" />
        : <Moon className="h-4 w-4" />}
    </button>
  )
}
