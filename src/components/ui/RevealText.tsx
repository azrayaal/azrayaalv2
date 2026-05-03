'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  once?: boolean
}

export function RevealText({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      clipPath:
        direction === 'up'
          ? 'inset(0 0 100% 0)'
          : direction === 'left'
          ? 'inset(0 100% 0 0)'
          : 'inset(0 0 0 100%)',
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      clipPath: 'inset(0 0 0 0)',
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn('overflow-hidden', className)}
    >
      {children}
    </motion.div>
  )
}

export function RevealLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <span ref={ref} className={cn('block overflow-hidden', className)}>
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        animate={isInView ? { y: '0%' } : { y: '100%' }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
