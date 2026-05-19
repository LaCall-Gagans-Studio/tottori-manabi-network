'use client'

// library
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

// payload
import { buildDictQuery } from '../lib/dictQuery'
import { getDicts } from '../lib/getDict'

export type DictFilterOption = { id: number; name: string }

function parseNumberArray(value: string | null): number[] {
  if (!value) return []
  return value
    .split(',')
    .map((v) => parseInt(v))
    .filter((n) => !isNaN(n))
}

type DictFilterProps = {
  initialCount: number
  initialTags: number[]
  initialType: number[]
  initialTargets: number[]
  initialRecognized: boolean | null
  initialKeyword: string
  initialSortBy: string
  availableTags: DictFilterOption[]
  availableType: DictFilterOption[]
  availableTargets: DictFilterOption[]
}

export const DictFilter: React.FC<DictFilterProps> = ({
  initialCount,
  initialTags,
  initialType,
  initialTargets,
  initialRecognized,
  initialKeyword,
  initialSortBy,
  availableTags,
  availableType,
  availableTargets,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tags, setTags] = useState<number[]>(initialTags)
  const [type, setType] = useState<number[]>(initialType)
  const [targets, setTargets] = useState<number[]>(initialTargets)
  const [recognized, setRecognized] = useState<boolean | null>(initialRecognized)
  const [keyword, setKeyword] = useState<string>(initialKeyword)
  const [sortBy, setSortBy] = useState<string>(initialSortBy)
  const [resultsCount, setResultsCount] = useState<number>(initialCount)

  useEffect(() => {
    setTags(parseNumberArray(searchParams.get('tags')))
    setType(parseNumberArray(searchParams.get('type')))
    setTargets(parseNumberArray(searchParams.get('targets')))
    setRecognized(
      searchParams.get('recognized') === null ? null : searchParams.get('recognized') === 'true',
    )
    setKeyword(searchParams.get('keyword') ?? '')
    setSortBy(searchParams.get('sort') ?? '')
    setResultsCount(initialCount)
  }, [searchParams, initialCount])

  useEffect(() => {
    const params = new URLSearchParams()
    if (tags.length) params.set('tags', tags.join(','))
    if (type.length) params.set('type', type.join(','))
    if (targets.length) params.set('targets', targets.join(','))
    if (recognized !== null) params.set('recognized', recognized.toString())
    if (keyword) params.set('keyword', keyword)
    if (sortBy) params.set('sort', sortBy)
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [tags, type, targets, recognized, keyword, sortBy, router])

  useEffect(() => {
    const query = buildDictQuery({ tags, type, targets, recognized, keyword, sortBy })
    let cancelled = false
    getDicts(query).then((res) => {
      if (!cancelled) setResultsCount(res.length)
    })
    return () => {
      cancelled = true
    }
  }, [tags, type, targets, recognized, keyword, sortBy])

  const toggleItem = (item: number, setFunc: React.Dispatch<React.SetStateAction<number[]>>) => {
    setFunc((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const renderMultiSelect = (
    label: string,
    items: { id: number; name: string }[],
    selected: number[],
    toggleFn: (id: number) => void,
  ) => (
    <div>
      <label className="block font-semibold mb-2">{label}:</label>
      <div className="flex flex-wrap gap-2">
        {items
          ?.sort((a, b) => a.id - b.id)
          .map((item) => {
            const isSelected = selected.includes(item.id)
            const style = isSelected
              ? 'bg-ws-primary text-white border-white'
              : 'bg-gray-100 text-gray-700 border-gray-300'
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleFn(item.id)}
                className={`px-3 py-1 rounded-full border text-sm hover:opacity-80 ${style}`}
              >
                {item.name}
              </button>
            )
          })}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderMultiSelect('種別を選択', availableType, type, (id) => toggleItem(id, setType))}
      {renderMultiSelect('ターゲットを選択', availableTargets, targets, (id) =>
        toggleItem(id, setTargets),
      )}
      {renderMultiSelect('タグを選択', availableTags, tags, (id) => toggleItem(id, setTags))}

      <div>
        <label>行政の認定:</label>
        <select
          onChange={(e) => {
            const val = e.target.value
            setRecognized(val === '' ? null : val === 'true')
          }}
          value={recognized === null ? '' : recognized.toString()}
          className="border p-2 rounded w-full"
        >
          <option value="">指定なし</option>
          <option value="true">あり</option>
          <option value="false">なし</option>
        </select>
      </div>

      <Input
        type="text"
        className="text-lg"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワード検索"
      />

      <div className="flex justify-between items-center">
        <div className="text-right text-sm text-slate-500">{resultsCount} 件が見つかりました</div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="並び替え" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tuition_asc">学費が安い順</SelectItem>
            <SelectItem value="capacity_asc">定員が少ない順</SelectItem>
            <SelectItem value="capacity_desc">定員が多い順</SelectItem>
            <SelectItem value="date_old">設立が古い順</SelectItem>
            <SelectItem value="date_new">設立が新しい順</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
