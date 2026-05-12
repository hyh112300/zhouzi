import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Container className="text-center">
        <h1 className="text-8xl font-bold text-accent">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
        >
          ← Back to Home
        </Link>
      </Container>
    </div>
  )
}
