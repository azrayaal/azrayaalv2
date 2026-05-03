import { getPayloadClient } from './payload'
import type { Experience } from '@/types'

export async function getExperience(): Promise<Experience[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'experience',
      limit: 100,
      sort: '-startDate',
    })
    return result.docs as unknown as Experience[]
  } catch {
    return []
  }
}
