'use client'

// library
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

// aaa
// payload
import { Dicts } from '../lib/getDict'
import { getDictTags } from '../lib/getDictTags'
import { getDictType } from '../lib/getDictType'
import { getDictTargets } from '../lib/getDictTargets'
import { buildDictQuery } from '../lib/dictQuery'
import { getDicts } from '../lib/getDict'

function parseNumberArray(value: string | null): number[] {
  if (!value) return []
  return value
    .split(',')
    .map((v) => parseInt(v))
    .filter((n) => !isNaN(n))
}
export const DictFilter: React.FC<{ initialResults: Dicts[] }> = ({ initialResults }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tags, setTags] = useState<number[]>([])
  const [type, setType] = useState<number[]>([])
  const [targets, setTargets] = useState<number[]>([])
  const [recognized, setRecognized] = useState<boolean | null>(null)
  const [keyword, setKeyword] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')
  const [resultsCount, setResultsCount] = useState<number>(initialResults.length)

  const [availableTags, setAvailableTags] = useState<{ id: number; name: string }[]>([])
  const [availableTargets, setAvailableTargets] = useState<{ id: number; name: string }[]>([])
  const [availableType, setAvailableType] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    setTags(parseNumberArray(searchParams.get('tags')))
    setType(parseNumberArray(searchParams.get('type')))
    setTargets(parseNumberArray(searchParams.get('targets')))
    setRecognized(
      searchParams.get('recognized') === null ? null : searchParams.get('recognized') === 'true',
    )
    setKeyword(searchParams.get('keyword') ?? '')
    setSortBy(searchParams.get('sort') ?? '')
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (tags.length) params.set('tags', tags.join(','))
    if (type.length) params.set('type', type.join(','))
    if (targets.length) params.set('targets', targets.join(','))
    if (recognized !== null) params.set('recognized', recognized.toString())
    if (keyword) params.set('keyword', keyword)
    if (sortBy) params.set('sort', sortBy)
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [tags, type, targets, recognized, keyword, sortBy])

  useEffect(() => {
    getDictTags().then((tags) => {
      setAvailableTags(tags.map((t) => ({ id: t.id, name: t.name })))
    })
    getDictType().then((type) => {
      setAvailableType(type.map((t) => ({ id: t.id, name: t.name })))
    })
    getDictTargets().then((targets) => {
      setAvailableTargets(targets.map((t) => ({ id: t.id, name: t.name })))
    })
  }, [])

  useEffect(() => {
    const query = buildDictQuery({ tags, type, targets, recognized, keyword, sortBy })
    getDicts(query).then((res) => {
      setResultsCount(res.length)
    })
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

      {/* キーワード検索 */}
      <Input
        type="text"
        className="text-lg"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワード検索"
      />

      <div className="flex justify-between items-center">
        <div className="text-right text-sm text-slate-500">{resultsCount} 件が見つかりました</div>

        {/* 並び替え */}
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
