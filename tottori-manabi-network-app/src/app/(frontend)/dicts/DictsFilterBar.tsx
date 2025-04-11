'use client'

import { useEffect, useState } from 'react'
import { getDicts, Dicts } from '../lib/getDict'
import { getDictTags } from '../lib/getDictTags'
import { getDictType } from '../lib/getDictType'
import { getDictTargets } from '../lib/getDictTargets'

export const DictFilter: React.FC = () => {
  const [tags, setTags] = useState<number[]>([])
  const [type, setType] = useState<number[]>([])
  const [targets, setTargets] = useState<number[]>([])
  const [availableTags, setAvailableTags] = useState<{ id: number; name: string }[]>([])
  const [availableTargets, setAvailableTargets] = useState<{ id: number; name: string }[]>([])
  const [availableType, setAvailableType] = useState<{ id: number; name: string }[]>([])

  const [recognized, setRecognized] = useState<boolean | null>(null)
  const [keyword, setKeyword] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')

  const [results, setResults] = useState<Dicts[]>([])

  useEffect(() => {
    getDictTags().then((tags) => {
      const mapped = tags.map((t) => ({ id: t.id, name: t.name }))
      setAvailableTags(mapped)
    })

    getDictType().then((type) => {
      const mapped = type.map((t) => ({ id: t.id, name: t.name }))
      setAvailableType(mapped)
    })

    getDictTargets().then((targets) => {
      const mapped = targets.map((t) => ({ id: t.id, name: t.name }))
      setAvailableTargets(mapped)
    })
  }, [])

  const buildQuery = () => {
    const params = new URLSearchParams()
    let andIndex = 0

    // 種別: OR検索をAND内にネスト
    if (type.length > 0) {
      type.forEach((t, i) => {
        params.set(`where[and][${andIndex}][or][${i}][type][equals]`, t.toString())
      })
      andIndex++
    }

    // ターゲット
    targets.forEach((target) => {
      params.set(`where[and][${andIndex}][targets][equals]`, target.toString())
      andIndex++
    })

    // タグ: AND検索
    tags.forEach((tag) => {
      params.set(`where[and][${andIndex}][tags][contains]`, tag.toString())
      andIndex++
    })

    // 認可
    if (recognized !== null) {
      params.set(`where[and][${andIndex}][recognition][equals]`, recognized.toString())
      andIndex++
    }

    // キーワード: OR検索もAND内にネスト
    if (keyword) {
      const fields = ['name', 'slogan_short', 'slogan_long', 'keywords', 'org']
      fields.forEach((field, i) => {
        params.set(`where[and][${andIndex}][or][${i}][${field}][contains]`, keyword)
      })
      andIndex++
    }

    // 並び替え
    if (sortBy === 'tuition_asc') {
      params.set('sort', 'tuition')
    } else if (sortBy === 'date_old') {
      params.set('sort', 'build_date')
    } else if (sortBy === 'date_new') {
      params.set('sort', '-build_date')
    }

    params.set('depth', '1')
    return params.toString()
  }

  useEffect(() => {
    const query = buildQuery()
    getDicts(query).then(setResults)
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
          ?.sort((a, b) => a.id - b.id) // ← ここで昇順に
          .map((item) => {
            const isSelected = selected.includes(item.id)
            const style = isSelected
              ? 'bg-blue-500 text-white border-blue-500'
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
          className="border p-2 rounded w-full"
        >
          <option value="">指定なし</option>
          <option value="true">あり</option>
          <option value="false">なし</option>
        </select>
      </div>

      <div>
        <label>キーワード検索:</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="名前、スローガン、団体名など"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>並び替え:</label>
        <select onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded w-full">
          <option value="">指定なし</option>
          <option value="tuition_asc">学費が安い順</option>
          <option value="date_old">設立が古い順</option>
          <option value="date_new">設立が新しい順</option>
        </select>
      </div>

      <div>
        <h2 className="font-bold">検索結果:</h2>
        <ul className="space-y-2">
          {results?.map((item) => (
            <li key={item.id} className="border p-2 rounded shadow">
              <strong>{item.name}</strong> - {item.tuition}円 - {item.slogan_short}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
