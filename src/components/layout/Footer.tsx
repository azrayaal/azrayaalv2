import Link from 'next/link'
import { Container } from './Container'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/azrayaal' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/azrayaal' },
  { label: 'Twitter', href: 'https://twitter.com/azrayaal' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t py-10 md:py-12"
      style={{
        borderColor: 'var(--fg-08)',
        fontFamily: 'var(--font-ibm-plex-mono)',
      }}
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Terminal prompt */}
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--fg-25)', fontSize: '11px' }}>azrayaal@portfolio</span>
            <span style={{ color: 'var(--fg-25)', fontSize: '11px' }}>~$</span>
            <span
              className="animate-cursor-blink"
              style={{ color: 'var(--fg-40)', fontSize: '11px' }}
            >
              _
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5 flex-wrap">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-100"
                style={{ color: 'var(--fg-50)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-[10px] tracking-wider"
            style={{ color: 'var(--fg-50)' }}
          >
            © {year} AZRAYAAL
          </p>
        </div>
      </Container>
    </footer>
  )
}
