import { DictType } from '@/payload-types'

export async function getDictType(): Promise<DictType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dictType?limit=1000`, {
    cache: 'no-store',
  })
  const json = await res.json()
  return json.docs
}
