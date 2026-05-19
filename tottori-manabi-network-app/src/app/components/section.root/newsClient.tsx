'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { FormatDate } from '@/app/(frontend)/lib/utils'
import type { News } from '@/app/(frontend)/lib/getNews'
import Link from 'next/link'

export default function NewsClient({ allData }: { allData: News[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const [activeTab, setActiveTab] = React.useState(0)
  const tabs = ['ALL', '相談会・配信', 'コラム・特集', 'お知らせ']

  const allNewsData = allData
  const eventNewsData = allData.filter((item) => item.type === 'events')
  const infoNewsData = allData.filter((item) => item.type === 'article')
  const otherNewsData = allData.filter((item) => item.type !== 'events' && item.type !== 'article')

  const tabContents = [allNewsData, eventNewsData, infoNewsData, otherNewsData]

  const carouselImages = [
    {
      url: '/root/banner-email.png',
      alt: 'Email相談',
      link: 'https://www.tuna-kan.org/dicts',
    },
    {
      url: '/root/banner-freeschoolList.png',
      alt: '認定フリースクール検索',
      link: 'https://www.tuna-kan.org/dicts?type=1&recognized=true',
    },
    {
      url: '/root/banner-dm.png',
      alt: 'dm相談',
      link: 'https://www.instagram.com/tunakan_tottori/',
    },
    {
      url: '/root/banner-govcenterList.png',
      alt: '教育支援センター検索',
      link: 'https://www.tuna-kan.org/dicts?type=3',
    },
  ]

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="py-6 lg:py-12 px-6 lg:px-0" aria-labelledby="news-heading">
      {/* 上部バナーカルーセル */}
      <div className="w-full max-w-5xl mx-auto py-6 lg:py-12">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            slidesToScroll: 1,
          }}
          className="w-3/4 mx-auto lg:w-full"
          aria-label="メインバナー"
        >
          <CarouselContent>
            {carouselImages.map((item, index) => (
              <CarouselItem key={index} className="flex justify-center lg:basis-1/2">
                <Link href={item.link} aria-label={item.alt}>
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={1200}
                    height={313}
                    sizes="(max-width: 1024px) 92vw, 480px"
                    loading="lazy"
                    className="rounded border shadow-md object-contain h-auto w-full"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="前のバナー"
            className="-left-12 bg-black text-white hover:bg-gray-700"
          />
          <CarouselNext
            aria-label="次のバナー"
            className="-right-12 bg-black text-white hover:bg-gray-700"
          />

          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`w-2 h-2 rounded-full transition-all ${
                  current === i ? 'bg-ws-primary scale-125' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* ニュース本体 */}
      <div className="py-12 lg:py-24 bg-ws-white">
        <div className="lg:max-w-6xl mx-auto lg:px-4">
          <h2 id="news-heading" className="text-center mb-8">
            <span className="text-5xl lg:text-4xl font-thin text-gray-500 tracking-widest">
              NEWS
            </span>
            <span className="block text-xl font-bold text-gray-800 mt-1">最新情報</span>
          </h2>
          <div
            className="flex justify-center border-b mb-4 gap-3 lg:gap-0"
            role="tablist"
            aria-label="ニュースのカテゴリ"
          >
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`news-panel-${index}`}
                id={`news-tab-${index}`}
                className={`px-2 lg:px-6 py-2 text-base lg:text-xl font-semibold transition-colors min-h-[44px] ${
                  activeTab === index
                    ? 'border-b-4 border-ws-primary text-ws-primary'
                    : 'text-gray-600 hover:text-ws-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`news-panel-${activeTab}`}
            aria-labelledby={`news-tab-${activeTab}`}
          >
            <NewsList articles={tabContents[activeTab]} />
          </div>
          <nav
            aria-label="ニュース一覧へのリンク"
            className="mt-8 grid grid-cols-2 lg:grid-cols-3 justify-center gap-8 text-xl"
          >
            <Link
              href="/news?q=notice"
              className="bg-ws-white col-span-2 lg:col-span-1 text-ws-primary py-2 px-6 rounded-full text-center border-2 border-ws-primary hover:opacity-70 min-h-[44px] flex items-center justify-center"
            >
              お知らせ一覧
            </Link>
            <Link
              href="/news?q=events"
              className="bg-ws-secondary text-ws-white py-2 px-6 rounded-full text-center hover:opacity-70 min-h-[44px] flex items-center justify-center"
            >
              イベント一覧
            </Link>
            <Link
              href="/news?q=article"
              className="bg-ws-primary text-ws-white py-2 px-6 rounded-full text-center hover:opacity-70 min-h-[44px] flex items-center justify-center"
            >
              コラム・特集一覧
            </Link>
          </nav>
        </div>
      </div>
    </section>
  )
}

const NewsList = ({ articles }: { articles: News[] }) => {
  const categoryMap: Record<News['type'], { label: string; class: string }> = {
    events: { label: '相談会・配信', class: 'bg-ws-secondary' },
    article: { label: 'コラム・特集', class: 'bg-ws-primary' },
    notice: { label: 'お知らせ', class: 'bg-ws-tertiary' },
  }

  const limitedArticles = articles.slice(0, 6)

  return (
    <ul>
      {limitedArticles.length > 0 ? (
        limitedArticles.map((article) => (
          <li
            key={article.id}
            className="flex flex-col lg:flex-row item-start lg:items-center justify-start lg:justify-center border-b py-2 lg:py-5"
          >
            <div className="flex flex-row lg:items-start gap-5 lg:gap-0 items-center ">
              <time
                dateTime={article.date_created}
                className="text-gray-600 text-sm lg:mb-1 text-nowrap basis-2/12 text-right"
              >
                <FormatDate date={article.date_created} />
              </time>
              <span
                className={`text-white text-xs px-2 py-1 rounded-full mx-0 sm:mx-4 my-1 basis-1/12 text-center sm:my-0 text-nowrap ${
                  categoryMap[article.type]?.class ?? 'bg-slate-600 '
                }`}
              >
                {categoryMap[article.type]?.label ?? 'その他'}
              </span>
            </div>
            <Link
              href={article.link}
              className="text-ws-black hover:underline lg:w-2/3 text-wrap"
            >
              {article.name}
            </Link>
          </li>
        ))
      ) : (
        <li>
          <p className="py-4 text-gray-600">現在、記事はありません。</p>
        </li>
      )}
    </ul>
  )
}
