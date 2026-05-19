// lib/dictQuery.ts

export type DictQueryOptions = {
  tags?: number[]
  type?: number[]
  targets?: number[]
  recognized?: boolean | null
  keyword?: string
  sortBy?: string
}

export function buildDictQuery({
  tags = [],
  type = [],
  targets = [],
  recognized,
  keyword,
  sortBy,
}: DictQueryOptions): string {
  const params = new URLSearchParams()
  let andIndex = 0

  if (type.length > 0) {
    type.forEach((t, i) => {
      params.set(`where[and][${andIndex}][or][${i}][type][equals]`, t.toString())
    })
    andIndex++
  }

  targets.forEach((target) => {
    params.set(`where[and][${andIndex}][targets][equals]`, target.toString())
    andIndex++
  })

  tags.forEach((tag) => {
    params.set(`where[and][${andIndex}][tags][contains]`, tag.toString())
    andIndex++
  })

  if (recognized !== null && recognized !== undefined) {
    params.set(`where[and][${andIndex}][recognition][equals]`, recognized.toString())
    andIndex++
  }

  if (keyword) {
    const subFields = ['name', 'org', 'slogan_short', 'slogan_long', 'keywords.keyword']
    subFields.forEach((field, i) => {
      params.set(`where[and][${andIndex}][or][${i}][${field}][contains]`, keyword)
    })
    andIndex++
  }

  switch (sortBy) {
    case 'tuition_asc':
      params.set('sort', 'tuition')
      break
    case 'capacity_asc':
      params.set('sort', 'capacity')
      break
    case 'capacity_desc':
      params.set('sort', '-capacity')
      break
    case 'date_old':
      params.set('sort', 'date_launch')
      break
    case 'date_new':
      params.set('sort', '-date_launch')
      break
  }

  return params.toString()
}
