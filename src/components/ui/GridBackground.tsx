'use client'

import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function GridBackground({ className, size = 'md' }: GridBackgroundProps) {
  const sizeMap = {
    sm: '24px 24px',
    md: '60px 60px',
    lg: '80px 80px',
  }

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `
          linear-gradient(var(--fg-04) 1px, transparent 1px),
          linear-gradient(90deg, var(--fg-04) 1px, transparent 1px)
        `,
        backgroundSize: sizeMap[size],
      }}
    />
  )
}
