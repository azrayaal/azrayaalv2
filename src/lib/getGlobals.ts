import { getPayloadClient } from './payload'
import type { Certification, StackItem } from '@/types'

export async function getCertifications(): Promise<Certification[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'certifications',
      limit: 100,
      sort: '-issueDate',
    })
    return result.docs as unknown as Certification[]
  } catch {
    return []
  }
}

export async function getStack(): Promise<StackItem[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'stack',
      limit: 100,
      sort: 'order',
    })
    return result.docs as unknown as StackItem[]
  } catch {
    return []
  }
}
