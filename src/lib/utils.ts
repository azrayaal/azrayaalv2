import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function formatYear(date: string | Date): string {
  return new Date(date).getFullYear().toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function padIndex(index: number): string {
  return String(index).padStart(2, '0')
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function scrambleText(text: string, progress: number): string {
  const length = text.length
  const revealedCount = Math.floor(progress * length)
  return text
    .split('')
    .map((char, i) => {
      if (i < revealedCount) return char
      if (char === ' ') return ' '
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    .join('')
}
