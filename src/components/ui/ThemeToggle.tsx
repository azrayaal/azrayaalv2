'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className="w-8 h-5 border flex items-center justify-center"
        style={{ borderColor: 'var(--fg-15)' }}
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center border px-2 py-1 gap-2 transition-colors"
      style={{
        borderColor: 'var(--fg-15)',
        fontFamily: 'var(--font-ibm-plex-mono)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="text-[9px] tracking-[0.15em] uppercase" style={{ color: 'var(--fg-30)' }}>
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
      {/* Track */}
      <div
        className="relative w-7 h-3 border"
        style={{ borderColor: 'var(--fg-20)' }}
      >
        <motion.div
          className="absolute top-0.5 w-2 h-2"
          style={{ background: 'var(--fg)' }}
          animate={{ left: isDark ? 1 : 'calc(100% - 10px)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
    </motion.button>
  )
}
