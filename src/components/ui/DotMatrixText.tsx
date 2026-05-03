'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*'

interface DotMatrixTextProps {
  text: string
  className?: string
  scrambleDuration?: number
  scrambleOnMount?: boolean
  trigger?: boolean
}

export function DotMatrixText({
  text,
  className,
  scrambleDuration = 1200,
  scrambleOnMount = true,
  trigger,
}: DotMatrixTextProps) {
  const [displayText, setDisplayText] = useState(scrambleOnMount ? '' : text)
  const [isScrambling, setIsScrambling] = useState(false)

  const startScramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    const startTime = Date.now()
    const length = text.length

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / scrambleDuration, 1)
      const revealedCount = Math.floor(progress * length)

      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (i < revealedCount) return char
            if (char === ' ') return ' '
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (progress >= 1) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }

  useEffect(() => {
    if (scrambleOnMount) {
      const timeout = setTimeout(startScramble, 200)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (trigger) {
      startScramble()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return (
    <span
      className={cn('font-display', className)}
      style={{ fontFamily: 'var(--font-dot-gothic)' }}
    >
      {displayText}
    </span>
  )
}
