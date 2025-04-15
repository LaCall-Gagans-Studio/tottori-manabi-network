import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { DictTag } from '@/payload-types'
import { DictTarget } from '@/payload-types'
import { DictType } from '@/payload-types'
import { Media } from '@/payload-types'

export interface Dicts {
  id: string
  published: string
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
}

export interface Dict extends Dicts {
  date_recognized: string
  gallery: Media[]
  transport: string
  lunch: string
  citation: string
  link: string
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
  })

  // 追加クエリがある場合は末尾に追加
  const finalQuery = queryString ? `${baseParams.toString()}&${queryString}` : baseParams.toString()

  console.log(finalQuery)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dict?${finalQuery}`, {
    cache: 'no-store',
  })

  const json = await res.json()
  return json.docs
}

// getDict
export async function getDict(id: string): Promise<Dict> {
  const params = new URLSearchParams({
    'where[published][equals]': 'true',
    depth: '2',
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dict/${id}?${params.toString()}`,
    {
      cache: 'no-store',
    },
  )

  const json = await res.json()
  return json
}
