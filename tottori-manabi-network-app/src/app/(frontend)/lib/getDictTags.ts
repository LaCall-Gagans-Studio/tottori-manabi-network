import { DictTag } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export async function getDictTags(): Promise<DictTag[]> {
  try {
    const res = await fetch(apiUrl('/api/dictTags?limit=1000'), {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error(`[getDictTags] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getDictTags] unexpected error:', err)
    return []
  }
}
