'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GridBackground } from '@/components/ui/GridBackground'

const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'hi@azrayaal.dev', href: 'mailto:hi@azrayaal.dev' },
  { label: 'GITHUB', value: 'github.com/azrayaal', href: 'https://github.com/azrayaal' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/azrayaal', href: 'https://linkedin.com/in/azrayaal' },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 border-t overflow-hidden"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <GridBackground size="lg" />

      <Container size="wide">
        <SectionLabel index="06" label="Contact" className="mb-16 md:mb-20" />

        {/* CTA headline */}
        <div className="mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="leading-none"
            style={{
              fontFamily: 'var(--font-dot-gothic)',
              fontSize: 'clamp(2.5rem, 7vw, 8rem)',
              lineHeight: 0.9,
              color: 'var(--fg)',
              letterSpacing: '-0.01em',
            }}
          >
            LET&apos;S BUILD
            <br />
            <span style={{ color: 'var(--fg-20)' }}>SOMETHING</span>
            <br />
            <span style={{ color: 'var(--fg-70)' }}>REMARKABLE.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 max-w-md text-sm leading-relaxed font-bold"
            style={{ color: 'var(--fg-70)', fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Available for senior engineering roles, technical leadership, and select freelance projects.
            Open to relocating or working remotely with distributed teams.
          </motion.p>
        </div>

        {/* Contact links - stacked on mobile, grid on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 border-t"
          style={{ borderColor: 'var(--fg-08)' }}
        >
          {CONTACT_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              className="border-b sm:border-b-0 sm:border-r sm:last:border-r-0 py-6 sm:py-8 sm:px-6 sm:first:pl-0"
              style={{ borderColor: 'var(--fg-08)' }}
            >
              <p
                className="text-[9px] tracking-widest uppercase mb-2"
                style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {link.label}
              </p>
              <Link
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-2 transition-opacity hover:opacity-100"
                style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                <span className="text-[11px] tracking-wide border-b border-transparent group-hover:border-current transition-colors pb-0.5">
                  {link.value}
                </span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 md:mt-20 pt-8 border-t flex items-center gap-2 overflow-hidden"
          style={{ borderColor: 'var(--fg-05)' }}
        >
          <span style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '11px' }}>
            azrayaal@portfolio:~$
          </span>
          <span style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '11px' }}>
            echo &quot;Ready to ship.&quot;
          </span>
          <span
            className="animate-cursor-blink"
            style={{ color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '11px' }}
          >
            _
          </span>
        </motion.div>
      </Container>
    </section>
  )
}
