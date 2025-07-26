'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getArticleTags } from '../lib/getArticleTags'

export const ArticlesFilter: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [availableTags, setAvailableTags] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    const tagParam = searchParams.get('tags')
    const parsed = tagParam
      ? tagParam
          .split(',')
          .map((v) => parseInt(v))
          .filter((n) => !isNaN(n))
      : []
    setSelectedTags(parsed)
  }, [])

  useEffect(() => {
    getArticleTags().then((tags) => {
      setAvailableTags(tags.map((t) => ({ id: t.id, name: t.name })))
    })
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedTags.length) params.set('tags', selectedTags.join(','))
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [selectedTags])

  const toggleTag = (id: number) => {
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  return (
    <div className="">
      <div className="flex flex-wrap gap-3">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id)
          return (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`px-1 py-1 rounded cursor-pointer text-sm lg:text-base hover:bg-ws-primary hover:text-white duration-300 border ${
                isSelected
                  ? 'bg-ws-primary text-white border-white'
                  : ' text-gray-700 border-gray-300'
              }`}
            >
              {tag.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
