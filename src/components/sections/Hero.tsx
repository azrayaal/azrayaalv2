'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { GridBackground } from '@/components/ui/GridBackground'
import { Container } from '@/components/layout/Container'

// Null initial state → renders nothing on server → no hydration mismatch
function useClock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const META_ITEMS = [
  { label: 'SYSTEM', value: 'PORTFOLIO_OS v2.0' },
  { label: 'STATUS', value: 'ONLINE' },
  { label: 'BUILD', value: '2026.05' },
  { label: 'MODE', value: 'PRODUCTION' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const clock = useClock()

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end pb-12 md:pb-16 overflow-hidden"
    >
      {/* <GridBackground size="lg" /> */}

      {/* Dot matrix dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        // style={{
        //   backgroundImage: 'radial-gradient(circle, var(--fg-06) 1px, transparent 1px)',
        //   backgroundSize: '20px 20px',
        // }}
      />

      <motion.div style={{ y, opacity }} className="relative">
        <Container size="wide">

          {/* Main headline */}
          <div className="relative mb-8 md:mb-10">
            <h1
              className="leading-none tracking-tight select-none"
              style={{
                fontFamily: 'var(--font-dot-gothic)',
                fontSize: 'clamp(1.8rem, 7vw, 9rem)',
                lineHeight: 0.88,
                color: 'var(--fg)',
              }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  AZRA
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: 'var(--fg-15)' }}
                >
                  YAZID
                </motion.span>
              </span>
            </h1>
          </div>


          {/* Top metadata strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-1.5 "
          >
            {META_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="text-[9px] tracking-widest uppercase"
                  style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[9px] tracking-widest font-bold"
                  style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
            {/* Clock - suppressed until mounted to avoid hydration mismatch */}
            {clock && (
              <div className="ml-auto hidden sm:block">
                <span
                  className="text-[9px] tracking-widest tabular-nums font-bold"
                  style={{ color: 'var(--fg-50)', fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {clock} UTC+7
                </span>
              </div>
            )}
          </motion.div>

          {/* Bottom info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t pt-6"
            style={{ borderColor: 'var(--fg-08)' }}
          >
            <div className="max-w-sm md:max-w-none">
              <p
                className="text-[16px] tracking-[0.2em] uppercase mb-1 font-bold"
                style={{ color: 'var(--fg-25)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                FULL-STACK DEVELOPER
              </p>
              <p
                className="text-[12px] md:text-[16px] tracking-wider leading-relaxed font-bold"
                style={{ color: 'var(--fg)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                Crafting precision digital experiences at the intersection of design and engineering.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-px h-8"
                  style={{ background: `linear-gradient(to bottom, var(--fg-40), transparent)` }}
                />
                <div className="w-1 h-1 rounded-full" style={{ background: 'var(--fg-40)' }} />
              </motion.div>
              <span
                className="text-[16px] font-bold tracking-widest uppercase"
                style={{ color: 'var(--fg-20)', fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                SCROLL
              </span>
            </div>
          </motion.div>

        </Container>
      </motion.div>

      {/* Cinematic corner markers */}
      {[
        'top-8 left-5 md:left-6 border-t border-l',
        'top-8 right-5 md:right-6 border-t border-r',
        'bottom-8 left-5 md:left-6 border-b border-l',
        'bottom-8 right-5 md:right-6 border-b border-r',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 ${pos}`}
          style={{ borderColor: 'var(--fg-15)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
        />
      ))}
    </section>
  )
}
