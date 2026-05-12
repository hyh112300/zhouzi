import type { Metadata } from 'next'
import { SITE } from './constants'

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: {
      default: `${SITE.author} — ${SITE.description}`,
      template: `%s — ${SITE.author}`,
    },
    description: SITE.description,
    metadataBase: new URL(SITE.url),
    authors: [{ name: SITE.author }],
    creator: SITE.author,
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      siteName: SITE.title,
      title: `${SITE.author} — 前端工程师 / 创意开发者`,
      description: SITE.description,
      url: SITE.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE.author} — 前端工程师 / 创意开发者`,
      description: SITE.description,
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
    ...overrides,
  }
}
