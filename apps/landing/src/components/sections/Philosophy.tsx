'use client'

import { ScrollReveal } from '@/components/animation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

const QUOTES = [
  {
    text: '技术的最佳状态，是让人们更紧密地联系在一起。',
    author: '— 设计哲学',
  },
  {
    text: '简洁是终极的优雅。',
    author: '— 工程原则',
  },
]

export function Philosophy() {
  return (
    <Section id="philosophy" variant="alt">
      <Container>
        <div className="mx-auto max-w-3xl space-y-16">
          {QUOTES.map((quote, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.2}>
              <div className="text-center">
                <blockquote className="text-2xl font-light leading-relaxed tracking-tight text-text-primary md:text-4xl md:leading-snug">
                  &ldquo;
                  {quote.text}
                  &rdquo;
                </blockquote>
                <cite className="mt-4 block text-sm text-text-secondary not-italic">
                  {quote.author}
                </cite>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
