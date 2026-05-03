'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 border-b"
          style={{
            background: 'var(--navbar-bg)',
            backdropFilter: 'blur(14px)',
            borderColor: 'var(--fg-08)',
            opacity: bgOpacity,
          }}
        />

        <nav className="relative mx-auto max-w-screen-xl px-5 md:px-12 lg:px-16 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity shrink-0"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--fg)' }}
          >
            <span style={{ color: 'var(--fg)' }}>./</span>
            AZRAYAAL
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] font-bold tracking-[0.15em] uppercase transition-colors hover:opacity-100"
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    color: 'var(--fg)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            {/* Status pill - hidden on xs */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span
                className="text-[9px] tracking-widest uppercase"
                style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                AVAIL
              </span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--fg-50)' }} />
            </div>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px w-5"
                  style={{ background: 'var(--fg)' }}
                  animate={
                    mobileOpen
                      ? i === 0
                        ? { rotate: 45, y: 6 }
                        : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center md:hidden"
        style={{ background: 'var(--bg)' }}
        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
        animate={
          mobileOpen
            ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
            : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl tracking-[0.2em] uppercase"
                style={{
                  fontFamily: 'var(--font-dot-gothic)',
                  color: 'var(--fg)',
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </>
  )
}
