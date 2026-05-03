'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { formatDate } from '@/lib/utils'
import type { Certification } from '@/types'

const FALLBACK_CERTIFICATIONS: Certification[] = [
  { id: '1', title: 'AWS Solutions Architect – Professional', issuer: 'Amazon Web Services', issueDate: '2024-08-01', credentialUrl: '#' },
  { id: '2', title: 'Google Professional Cloud Architect', issuer: 'Google Cloud', issueDate: '2024-03-01', credentialUrl: '#' },
  { id: '3', title: 'Certified Kubernetes Administrator', issuer: 'Cloud Native Computing Foundation', issueDate: '2023-11-01', credentialUrl: '#' },
  { id: '4', title: 'MongoDB Professional Developer', issuer: 'MongoDB University', issueDate: '2023-06-01', credentialUrl: '#' },
]

interface CertificationsProps {
  data?: Certification[]
}

export function Certifications({ data = FALLBACK_CERTIFICATIONS }: CertificationsProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--fg-06)' }}
    >
      <Container size="wide">
        <SectionLabel index="05" label="Certifications" className="mb-12 md:mb-16" />

        {/* Mobile: card list */}
        <div className="flex flex-col gap-0 md:hidden">
          {data.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="border-b py-5 flex flex-col gap-1.5"
              style={{ borderColor: 'var(--fg-06)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="text-[11px] tracking-wide leading-tight"
                  style={{ color: 'var(--fg-70)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {cert.title}
                </span>
                {cert.credentialUrl && (
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] tracking-widest uppercase border-b shrink-0"
                    style={{ borderColor: 'var(--fg-15)', color: 'var(--fg-30)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    →
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[9px] tracking-wider uppercase"
                  style={{ color: 'var(--fg-30)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {cert.issuer}
                </span>
                <span
                  className="text-[9px] tabular-nums"
                  style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {formatDate(cert.issueDate)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: table */}
        <div
          className="hidden md:block border"
          style={{ borderColor: 'var(--fg-08)' }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[2rem_1fr_auto_auto_5rem] px-6 py-3 border-b gap-4"
            style={{ borderColor: 'var(--fg-08)', background: 'var(--fg-02)' }}
          >
            {['#', 'CREDENTIAL', 'ISSUER', 'DATE', ''].map((h) => (
              <span
                key={h}
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {data.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group relative grid grid-cols-[2rem_1fr_auto_auto_5rem] px-6 py-4 border-b last:border-b-0 items-center gap-4"
              style={{ borderColor: 'var(--fg-05)' }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ background: 'var(--hover-row)' }}
              />
              <span
                className="text-[10px] tabular-nums"
                style={{ color: 'var(--fg-15)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="text-[11px] tracking-wide"
                style={{ color: 'var(--fg-70)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {cert.title}
              </span>
              <span
                className="text-[10px] tracking-wider uppercase whitespace-nowrap"
                style={{ color: 'var(--fg-30)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {cert.issuer}
              </span>
              <span
                className="text-[10px] tabular-nums whitespace-nowrap"
                style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {formatDate(cert.issueDate)}
              </span>
              <div className="flex justify-end">
                {cert.credentialUrl && (
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] tracking-widest uppercase border-b pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: 'var(--fg-20)', color: 'var(--fg-40)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    VERIFY →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
