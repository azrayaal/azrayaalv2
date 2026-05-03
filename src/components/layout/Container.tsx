import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'wide' | 'narrow' | 'full'
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  const sizeClasses = {
    default: 'max-w-screen-xl px-6 md:px-12 lg:px-16',
    wide: 'max-w-screen-2xl px-6 md:px-12 lg:px-16',
    narrow: 'max-w-screen-md px-6 md:px-12',
    full: 'px-6 md:px-12 lg:px-16',
  }

  return (
    <div className={cn('mx-auto w-full', sizeClasses[size], className)}>
      {children}
    </div>
  )
}
