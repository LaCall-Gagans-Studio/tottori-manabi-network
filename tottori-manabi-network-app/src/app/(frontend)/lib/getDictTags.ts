import { DictTag } from '@/payload-types'

export async function getDictTags(): Promise<DictTag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dictTags?limit=1000`, {
    cache: 'no-store',
  })
  const json = await res.json()
  return json.docs
}
