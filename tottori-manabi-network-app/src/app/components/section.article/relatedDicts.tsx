import Image from 'next/image'
import Link from 'next/link'

import { getDicts } from '@/app/(frontend)/lib/getDict'
import { Button_big } from '@/app/components/button-big'

import { CiLocationOn } from 'react-icons/ci'

const SHOW_COUNT = 3

// 記事ごとに違う施設が並ぶよう、記事 ID から開始位置を決める
function pickDicts<T>(items: T[], seed: string, count: number): T[] {
  if (items.length <= count) return items
  let hash = 0
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const start = hash % items.length
  return Array.from({ length: count }, (_, i) => items[(start + i) % items.length])
}

/** 記事の読了後に、詳細ページのある施設と施設一覧への導線を出す */
export default async function RelatedDicts({ articleId }: { articleId: string }) {
  const dicts = (await getDicts()).filter((dict) => dict.hasPage)
  const picked = pickDicts(dicts, articleId, SHOW_COUNT)

  return (
    <section
      className="w-11/12 lg:w-1/2 mx-auto pb-24"
      aria-labelledby="related-dicts-heading"
    >
      <h2 id="related-dicts-heading" className="text-2xl font-bold text-ws-primary">
        鳥取のフリースクール・教育支援センターをさがす
      </h2>
      <p className="mt-2 text-sm text-slate-700">
        つなかんでは、鳥取県内の居場所を取材して紹介しています。
      </p>

      {picked.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-4">
          {picked.map((dict) => (
            <li key={dict.id}>
              <Link
                href={`/dicts/${dict.id}`}
                aria-label={`${dict.name}の詳細ページへ`}
                className="flex h-28 rounded-lg bg-[#f8fdee] shadow-md hover:shadow-xl duration-300 overflow-hidden"
              >
                <div className="relative w-1/3 lg:w-1/4 h-full flex-shrink-0 border-l-2 border-ws-primary">
                  <Image
                    src={dict.thumbnail?.url ?? '/logo.png'}
                    alt={dict.thumbnail?.alt || `${dict.name}のサムネイル`}
                    fill
                    sizes="(min-width: 1024px) 160px, 30vw"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </div>
                <div className="ml-3 pr-3 py-2 overflow-hidden">
                  <h3 className="text-base lg:text-lg font-bold text-ws-primary">{dict.name}</h3>
                  {dict.slogan_short && (
                    <p className="text-xs lg:text-sm text-slate-700 text-nowrap overflow-hidden">
                      {dict.slogan_short}
                    </p>
                  )}
                  {dict.address && (
                    <p className="mt-1 flex items-center gap-1 text-xs lg:text-sm text-slate-700 text-nowrap overflow-hidden">
                      <CiLocationOn className="text-ws-primary flex-shrink-0" aria-hidden="true" />
                      {dict.address}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Button_big text={<>施設一覧を見る</>} url="/dicts" props="mt-8 text-center" />
    </section>
  )
}
