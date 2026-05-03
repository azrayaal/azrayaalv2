export interface Project {
  id: string
  title: string
  slug: string
  thumbnail?: Media
  gallery?: Media[]
  description: string
  content?: unknown
  stack?: string[]
  year: number
  status: 'completed' | 'in-progress' | 'archived'
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  order?: number
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  description: string
  technologies?: string[]
  location?: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialUrl?: string
  image?: Media
}

export interface StackItem {
  id: string
  category: string
  technologies: string[]
  icon?: string
  order?: number
}

export interface Media {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
  filename?: string
}

export interface SeoField {
  title?: string
  description?: string
  image?: Media
}
