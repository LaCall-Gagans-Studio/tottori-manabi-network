import { DictTarget } from '@/payload-types'

export async function getDictTargets(): Promise<DictTarget[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dictTargets?limit=1000`, {
    cache: 'no-store',
  })
  const json = await res.json()
  return json.docs
}
