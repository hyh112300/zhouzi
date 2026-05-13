import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Footer } from '@/components/sections/Footer'
import { SITE } from '@/lib/constants'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0B',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.author} — 前端工程师 / 创意开发者`,
    template: `%s — ${SITE.author}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: SITE.title,
    title: `${SITE.author} — 前端工程师 / 创意开发者`,
    description: SITE.description,
    url: SITE.url,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.author} — 前端工程师 / 创意开发者`,
    description: SITE.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { title: `${SITE.author} Blog`, url: '/blog/feed.xml' },
      ],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-body bg-bg-primary text-text-primary antialiased`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="relative">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
