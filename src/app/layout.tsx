import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AZRAYAAL — Full-Stack Developer',
  description: 'Full-stack developer crafting precision digital experiences at the intersection of design and engineering.',
  openGraph: {
    title: 'AZRAYAAL — Full-Stack Developer',
    description: 'Crafting precision digital experiences at the intersection of design and engineering.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
