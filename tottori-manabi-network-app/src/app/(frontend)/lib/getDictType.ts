import { DictType } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export async function getDictType(): Promise<DictType[]> {
  try {
    const res = await fetch(apiUrl('/api/dictType?limit=1000'), {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error(`[getDictType] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getDictType] unexpected error:', err)
    return []
  }
}
