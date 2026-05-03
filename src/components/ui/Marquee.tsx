'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
  className?: string
  itemClassName?: string
}

export function Marquee({
  items,
  speed = 30,
  direction = 'left',
  separator = '—',
  className,
  itemClassName,
}: MarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items]
  const duration = (items.length * speed) / 10

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn('inline-flex items-center', itemClassName)}
            style={{
              color: 'var(--fg-25)',
              fontFamily: 'var(--font-ibm-plex-mono)',
            }}
          >
            <span>{item}</span>
            <span className="mx-4 md:mx-6" style={{ color: 'var(--fg-15)' }}>
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
