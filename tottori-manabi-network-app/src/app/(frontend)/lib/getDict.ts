import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { DictTag } from '@/payload-types'
import { DictTarget } from '@/payload-types'
import { DictType } from '@/payload-types'
import { Media } from '@/payload-types'
import { apiUrl } from './apiBaseUrl'

export interface Dicts {
  id: string
  published: string
  hasPage: boolean
  name: string
  type: DictType[] | null
  slogan_short: string
  slogan_long: string
  targets: DictTarget[] | null
  address: string
  tags: DictTag[] | null
  thumbnail: Media
  recognition: boolean
  tuition: number
  date_launch: string
  org: string
  keywords: string[]
  capacity: number
  link: string
}

export interface Dict extends Dicts {
  chair: string
  date_recognized: string
  gallery: Media[]
  transport: string
  lunch: string
  citation: string
  location: string[]
  // richTexts
  main: SerializedEditorState
  point: SerializedEditorState
  schedule: SerializedEditorState
  costs: SerializedEditorState
  events: SerializedEditorState
}

////////////////////////////////////// 取得処理

// getDicts
export async function getDicts(queryString: string = ''): Promise<Dicts[]> {
  const baseParams = new URLSearchParams({
    'where[published][equals]': 'true',
    depth: '1',
    limit: '200',
  })

  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  try {
    const res = await fetch(apiUrl(`/api/dict?${finalQuery}`), {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`[getDicts] fetch failed: ${res.status} ${res.statusText}`)
      return []
    }
    const json = await res.json()
    return json.docs ?? []
  } catch (err) {
    console.error('[getDicts] unexpected error:', err)
    return []
  }
}

// getDict
export async function getDict(id: string): Promise<Dict | null> {
  const params = new URLSearchParams({
    'where[published][equals]': 'true',
    depth: '2',
  })

  try {
    const res = await fetch(apiUrl(`/api/dict/${id}?${params.toString()}`), {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`[getDict] fetch failed: ${res.status} ${res.statusText}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('[getDict] unexpected error:', err)
    return null
  }
}
