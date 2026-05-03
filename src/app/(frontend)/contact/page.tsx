import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact — AZRAYAAL',
  description: 'Get in touch for engineering roles, technical leadership, or select freelance projects.',
}

export default function ContactPage() {
  return (
    <div className="pt-14">
      <Contact />
    </div>
  )
}
