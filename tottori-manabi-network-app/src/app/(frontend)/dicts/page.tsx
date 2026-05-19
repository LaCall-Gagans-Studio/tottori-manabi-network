import { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'

import { siteConfig } from '../siteConfig'
import { getDicts } from '../lib/getDict'
import { getDictTags } from '../lib/getDictTags'
import { getDictType } from '../lib/getDictType'
import { getDictTargets } from '../lib/getDictTargets'
import { DictFilter } from './dictsFilter'
import { DictTargetsConverts } from '../lib/utils'
import { buildDictQuery } from '../lib/dictQuery'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { JsonLd, buildBreadcrumbSchema, buildItemListSchema } from '../JsonLd'

import { CiLocationOn, CiUser } from 'react-icons/ci'
import type { Dicts } from '../lib/getDict'

function DictListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:gap-10 animate-pulse" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-52 rounded-lg bg-gray-200" />
      ))}
    </div>
  )
}

function DictCard({ dict }: { dict: Dicts }) {
  const regionTag = dict.tags?.find((tag) => tag.name?.includes('東部'))
    ? { label: '東部', hover: 'group-hover:bg-lime-500', bg: 'bg-ws-primary' }
    : dict.tags?.find((tag) => tag.name?.includes('中部'))
      ? { label: '中部', hover: 'group-hover:bg-pink-500', bg: 'bg-ws-secondary' }
      : dict.tags?.find((tag) => tag.name?.includes('西部'))
        ? { label: '西部', hover: 'group-hover:bg-blue-500', bg: 'bg-ws-tertiary' }
        : null

  const typeLabel =
    (dict.type?.[0]?.id === 1 && 'フリースクール') ||
    (dict.type?.[0]?.id === 3 && '教育支援センター') ||
    ''
  const typeBg =
    (dict.type?.[0]?.id === 1 && 'bg-ws-primary') ||
    (dict.type?.[0]?.id === 3 && 'bg-ws-secondary') ||
    ''

  const thumbnailSrc = dict.thumbnail?.url ?? '/logo.png'
  const thumbAlt = dict.thumbnail?.alt || `${dict.name}のサムネイル`

  const inner = (
    <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-1 lg:group-hover:-translate-x-8 transition-all">
      {regionTag && (
        <div
          aria-label={`${regionTag.label}エリア`}
          className={`absolute -top-2 lg:-top-5 -left-2 lg:-left-5 w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center
            text-white text-base lg:text-lg font-medium rounded-full shadow-md ring-2 ring-ws-white ring-offset-2 z-20
            transition-colors duration-200 ${regionTag.bg} ${regionTag.hover}`}
        >
          {regionTag.label}
        </div>
      )}
      <div
        className={`absolute bottom-0 left-0 px-2 py-0.5 text-white text-xs lg:text-lg rounded-se-lg ${typeBg}`}
      >
        {typeLabel}&nbsp;
      </div>
      <div className="relative h-full w-1/3 lg:w-1/4 rounded-l-lg overflow-hidden border-l-2 border-ws-primary">
        <Image
          src={thumbnailSrc}
          alt={thumbAlt}
          fill
          sizes="(min-width: 1024px) 200px, 33vw"
          loading="lazy"
          className="object-cover object-center"
        />
      </div>
      <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">
        <h2 className="text-base lg:text-2xl font-bold text-ws-primary">{dict.name}</h2>
        <p className="text-xs lg:text-base font-medium text-slate-700 text-nowrap">
          {dict.slogan_short}
        </p>
        <p className="mt-1 text-base w-full font-thin text-slate-700 text-nowrap group-hover:animate-marquee group-hover:text-black duration-300">
          {dict.slogan_long ? dict.slogan_long : '詳細がありません'}
        </p>
        <div className="mt-2 flex flex-col gap-1 duration-300">
          <div className="flex items-center gap-1">
            <CiUser className="text-ws-primary group-hover:text-lime-500" aria-hidden="true" />
            <div className="text-xs lg:text-sm font-normal text-slate-700 flex group-hover:text-black duration-300">
              {dict.targets && <DictTargetsConverts targets={dict.targets} />}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <CiLocationOn
              className="text-ws-primary mt-1 group-hover:text-lime-500"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-slate-700 text-nowrap overflow-hidden group-hover:text-black duration-300">
              {dict.address}
            </p>
          </div>
          <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap justify-end gap-1 lg:font-semibold text-slate-700">
            {dict.tags?.map((tag) => (
              <p key={tag.id} className="bg-ws-black px-1 py-1 rounded text-slate-50">
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return dict.hasPage ? (
    <a
      href={`/dicts/${dict.id}`}
      aria-label={`${dict.name}の詳細ページへ`}
      className="h-52 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow block"
    >
      {inner}
      <div
        aria-hidden="true"
        className="h-full w-16 flex items-center bg-ws-black absolute right-0 top-0 z-0 rounded-r-lg"
      >
        <p className="text-right w-6 ml-auto pr-2 font-bold text-white">詳細を見る</p>
      </div>
    </a>
  ) : (
    <a
      href={dict.link}
      aria-label={`${dict.name}の公式サイトを開く`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-36 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow block"
    >
      <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300">
        {regionTag && (
          <div
            aria-label={`${regionTag.label}エリア`}
            className={`absolute -top-2 lg:-top-5 -left-2 lg:-left-5 w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center
              text-white text-base lg:text-lg font-medium rounded-full shadow-md ring-2 ring-ws-white ring-offset-2
              transition-colors duration-200 ${regionTag.bg} ${regionTag.hover}`}
          >
            {regionTag.label}
          </div>
        )}
        <div
          className={`absolute bottom-0 left-0 px-2 py-0.5 text-white text-xs lg:text-lg rounded-se-lg ${typeBg}`}
        >
          {typeLabel}&nbsp;
        </div>
        <div className="relative h-full w-1/3 lg:w-1/4 rounded-l-lg overflow-hidden border-l-2 border-ws-primary">
          <Image
            src={thumbnailSrc}
            alt={thumbAlt}
            fill
            sizes="(min-width: 1024px) 200px, 33vw"
            loading="lazy"
            className="object-cover object-center"
          />
        </div>
        <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">
          <h2 className="text-base lg:text-2xl font-bold text-ws-primary">{dict.name}</h2>
          <div className="mt-2 flex flex-col gap-1 duration-300">
            <div className="flex items-center gap-1">
              <CiUser className="text-ws-primary" aria-hidden="true" />
              <div className="text-xs lg:text-sm font-normal text-slate-700 group-hover:text-black duration-300 flex">
                {dict.targets && <DictTargetsConverts targets={dict.targets} />}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <CiLocationOn className="text-ws-primary mt-1" aria-hidden="true" />
              <p className="text-sm font-normal text-slate-700 text-nowrap overflow-hidden group-hover:text-black duration-300">
                {dict.address}
              </p>
            </div>
            <p className="text-xs text-slate-700">
              ※詳細ページはまだありません。外部リンクに飛びます。
            </p>
            <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap justify-end gap-1 lg:font-semibold text-slate-700">
              {dict.tags?.map((tag) => (
                <p key={tag.id} className="bg-ws-black px-1 py-1 rounded text-slate-50">
                  {tag.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-full w-16 flex items-center bg-ws-black absolute right-0 top-0 z-0 rounded-r-lg"
      >
        <p className="text-right w-6 ml-auto pr-2 font-bold text-white">サイトに行く</p>
      </div>
    </a>
  )
}

/*
  ハイドレーション不一致を防ぐため、サーバー上では ID 順の安定 sort を実施。
  ユーザー操作で並び替える際は dictsFilter 側のクライアント処理で対応。
*/
async function DictList({ query }: { query: string }) {
  const rawDicts = await getDicts(query)
  const dicts = [...rawDicts].sort((a, b) => String(a.id).localeCompare(String(b.id)))

  return (
    <>
      {dicts?.map((dict) => (
        <DictCard key={dict.id} dict={dict} />
      ))}
      {dicts.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            ...buildItemListSchema({
              url: `${siteConfig.url}/dicts`,
              items: dicts.map((d) => ({
                name: d.name,
                url: d.hasPage ? `/dicts/${d.id}` : d.link,
              })),
            }),
          }}
        />
      )}
    </>
  )
}

export default async function DictsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams

  const tags = resolvedParams.tags?.split(',').map(Number) || []
  const type = resolvedParams.type?.split(',').map(Number) || []
  const targets = resolvedParams.targets?.split(',').map(Number) || []
  const recognized =
    resolvedParams.recognized === undefined ? null : resolvedParams.recognized === 'true'
  const keyword = resolvedParams.keyword || ''
  const sortBy = resolvedParams.sort || ''

  const query = buildDictQuery({ tags, type, targets, recognized, keyword, sortBy })

  const [dictTags, dictTypes, dictTargets, initialDicts] = await Promise.all([
    getDictTags(),
    getDictType(),
    getDictTargets(),
    getDicts(query),
  ])

  const filterOptions = {
    initialCount: initialDicts.length,
    initialTags: tags,
    initialType: type,
    initialTargets: targets,
    initialRecognized: recognized,
    initialKeyword: keyword,
    initialSortBy: sortBy,
    availableTags: dictTags.map((t) => ({ id: t.id, name: t.name })),
    availableType: dictTypes.map((t) => ({ id: t.id, name: t.name })),
    availableTargets: dictTargets.map((t) => ({ id: t.id, name: t.name })),
  }

  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">{title}</h1>
        <div className="p-4 pt-4 lg:pt-12 mb-12 lg:h-full w-full mx-auto bg-[#f8fdee] lg:bg-transparent z-20">
          <div className="w-full lg:max-w-[800px] lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-8 lg:gap-10 items-center relative">
            <Suspense
              fallback={<div className="h-48 animate-pulse rounded-lg bg-gray-200" aria-hidden="true" />}
            >
              <DictFilter {...filterOptions} />
            </Suspense>
            <Suspense fallback={<DictListSkeleton />}>
              <DictList query={query} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url,
          isPartOf: { '@id': `${siteConfig.url}/#website` },
          breadcrumb: buildBreadcrumbSchema([
            { name: 'ホーム', url: '/' },
            { name: 'フリースクール・教育支援センター一覧', url: '/dicts' },
          ]),
        }}
      />
    </>
  )
}

const title = '鳥取のフリースクール・教育支援施設 一覧'
const description =
  '鳥取県内のフリースクールや教育支援センター、不登校支援施設などの情報を一覧で紹介。不登校・学びの多様性に関心のある方必見の施設ガイドです。'
const url = `${siteConfig.url}/dicts`
const image = `${siteConfig.url}/logo.png`
const keywords = [
  ...siteConfig.keywords,
  '鳥取',
  '不登校',
  'フリースクール',
  '教育支援',
  '居場所',
  '多様な学び',
  '支援機関',
  '一覧',
]

export const metadata: Metadata = {
  title,
  description,
  keywords,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    images: [{ url: image, width: 1200, height: 800, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
  alternates: { canonical: '/dicts' },
}
