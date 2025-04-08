import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export interface Media {
  id: string
  filename: string
  url: string
  mimeType: string
  [key: string]: any
}

export interface DictTag {
  id: string
  name: string
}

export interface DictEntryBasics {
  id: string
  name: string
  slogan_short: string
  slogan_long: string
  target?: string[]
  address: string
  tags?: DictTag[] | null
  thumbnail?: Media | null
}

export interface DictEntryDetails {
  // basics
  id: string
  name: string
  slogan_short: string
  slogan_long: string
  target?: string[]
  address: string
  tags?: DictTag[] | null
  thumbnail?: Media | null
  // details (added)
  org: string
  transport: string
  lunch: string
  citation: string
  main: SerializedEditorState
  point: SerializedEditorState
  schedule: SerializedEditorState
  costs: SerializedEditorState
  events: SerializedEditorState
  capacity: number
  recognition: boolean
  date_launch: string
  date_recognized: string
  location: {
    lat: number
    lng: number
  }
  link: string
}

export async function getDictEntries(): Promise<DictEntryBasics[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dict`, {
    cache: 'no-store',
  })
  const json = await res.json()

  return json.docs
}

export async function getDictEntryById(id: string): Promise<DictEntryDetails | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dict/${id}?depth=2`, {
    cache: 'no-store',
  })

  if (!res.ok) return null
  const json = await res.json()
  return json
}
