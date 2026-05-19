import { DictTarget } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export async function getDictTargets(): Promise<DictTarget[]> {
  try {
    const res = await fetch(apiUrl('/api/dictTargets?limit=1000'), {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error(`[getDictTargets] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getDictTargets] unexpected error:', err)
    return []
  }
}
