'use client'

import type { BlogPost } from '@/types'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { ScrollReveal } from '@/components/animation'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const RECENT_POSTS: BlogPost[] = [
  {
    title: '用 React Three Fiber 构建沉浸式 3D 体验',
    description:
      '深入探讨如何使用 R3F 和自定义着色器创建高性能 WebGL 应用。',
    date: '2026-04-15',
    href: '/blog/posts/building-immersive-3d-experiences',
    tags: ['Three.js', 'React', 'WebGL'],
    readingTime: '12 分钟',
  },
  {
    title: 'Web 高性能动画的艺术',
    description:
      '探索在视觉表现与性能之间取得平衡的动画技术。',
    date: '2026-03-20',
    href: '/blog/posts/art-of-performant-animations',
    tags: ['性能优化', 'CSS', 'Framer Motion'],
    readingTime: '8 分钟',
  },
]

export function BlogEntry() {
  return (
    <Section id="blog" variant="alt">
      <Container>
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                博客
              </h2>
            </div>
            <p className="mx-auto max-w-xl text-text-secondary">
              关于前端工程、创意编程与技术的思考。
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-2xl space-y-6">
          {RECENT_POSTS.map((post, idx) => (
            <ScrollReveal key={post.title} delay={idx * 0.1}>
              <Link href={post.href}>
                <article className="group rounded-xl border border-border bg-bg-surface/50 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/30">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              查看全部文章
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  )
}
