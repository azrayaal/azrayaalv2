import type { Where } from 'payload'
import { getPayloadClient } from './payload'
import type { Project } from '@/types'

export async function getProjects(options?: {
  featured?: boolean
  limit?: number
}): Promise<Project[]> {
  try {
    const payload = await getPayloadClient()
    const where: Where = {}
    if (options?.featured !== undefined) {
      where.featured = { equals: options.featured }
    }
    const result = await payload.find({
      collection: 'projects',
      where,
      limit: options?.limit ?? 100,
      sort: 'order',
      draft: false,
    })
    return result.docs as unknown as Project[]
  } catch {
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: false,
    })
    return (result.docs[0] as unknown as Project) ?? null
  } catch {
    return null
  }
}
