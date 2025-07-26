'use client'

import { useState, useEffect, useRef } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default function RichTextWithToc({ data }: { data: any }) {
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([])
  const [showAll, setShowAll] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headings = contentRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6')
    if (!headings) return

    const idMap = new Map<string, number>()
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]/g, '')

    const newToc: typeof toc = []

    headings.forEach((el) => {
      const level = parseInt(el.tagName[1])
      const text = el.textContent ?? ''
      const baseId = slugify(text)
      const count = idMap.get(baseId) ?? 0
      const id = count > 0 ? `${baseId}-${count}` : baseId
      idMap.set(baseId, count + 1)
      el.id = id
      newToc.push({ id, text, level })
    })

    setToc(newToc)
  }, [data])

  const displayedToc = showAll ? toc : toc.slice(0, 10)

  return (
    <div className="flex flex-col gap-12 my-12 w-full">
      <div className="bg-slate-100 border border-gray-200 rounded-md p-4">
        <h2 className="font-bold text-gray-800 text-base mb-4">目次</h2>
        <ul className="text-xs lg:text-sm text-gray-700 space-y-2">
          {displayedToc.map((item) => (
            <li key={item.id} className={`ml-${(item.level - 1) * 4}`}>
              <a
                href={`#${item.id}`}
                className="block border-b py-1 hover:border-b-2 border-transparent pl-2 border-b-slate-300 hover:border-ws-primary hover:text-ws-primary transition-all"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
        {toc.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-sm text-slate-500 p-1 border hover:underline"
          >
            {showAll ? '' : 'すべて表示'}
          </button>
        )}
      </div>

      <article
        ref={contentRef}
        className="prose-sm lg:first:prose text-slate-600 max-w-none w-full"
      >
        <RichText data={data} className="max-w-none" />
      </article>
    </div>
  )
}
