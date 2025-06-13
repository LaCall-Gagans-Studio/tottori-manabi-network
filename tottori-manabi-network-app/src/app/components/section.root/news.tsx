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

// --- 型定義 ---
interface NewsArticle {
  id: string
  date: string
  category: string
  categoryClass: string
  title: string
  url: string
}

// --- データ ---
const allNewsData: NewsArticle[] = [
  {
    id: 'a901',
    date: '2025年05月14日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title: 'とっとりインターンシップ〔Instagram公式アカウント〕を開設しました  (^O^)／',
    url: 'https://www.tottori-internship.net/news/a901/',
  },
  {
    id: 'z622',
    date: '2025年05月01日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title:
      '【学生のみなさまへ】２０２５夏もパッケージ型プログラムを実施！いろいろなテーマを持った楽しいプログラムを用意しています！',
    url: 'https://www.tottori-internship.net/news/z622/',
  },
  {
    id: 's102',
    date: '2025年04月01日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title: '【学生のみなさまへ】２０２５新緑・夏季インターンのエントリー受付を開始します。',
    url: 'https://www.tottori-internship.net/news/s102/',
  },
  {
    id: 'y147',
    date: '2025年03月24日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title:
      '【学生のみなさまへ】２～３月実施のプログラムには締切が迫っているものが多数ありますのでエントリーはお早めに (^^♪',
    url: 'https://www.tottori-internship.net/news/y147/',
  },
]

const eventNewsData: NewsArticle[] = [
  {
    id: 'g338',
    date: '2024年11月19日',
    category: 'イベント',
    categoryClass: 'bg-ws-primary',
    title:
      '【学生のみなさまへ】とっとりインターンシップ冬春オンラインフェスティバル（12/6～7）を開催します ❕',
    url: 'https://www.tottori-internship.net/event/g338/',
  },
  {
    id: 'q172',
    date: '2024年06月03日',
    category: 'イベント',
    categoryClass: 'bg-ws-primary',
    title: '【学生のみなさまへ】〈開催決定！！〉とっとりインターンシップpresentsオンライン大交流会',
    url: 'https://www.tottori-internship.net/event/q172-copy-3/',
  },
  {
    id: '6568',
    date: '2024年05月27日',
    category: 'イベント',
    categoryClass: 'bg-ws-primary',
    title:
      '【学生のみなさまへ】とっとりインターンシップWEBセミナー＆交流会を開催いたします（6/27，7/1）申込受付中！',
    url: 'https://www.tottori-internship.net/event/6568-copy-2/',
  },
  {
    id: '2023',
    date: '2024年04月12日',
    category: 'イベント',
    categoryClass: 'bg-ws-primary',
    title:
      '【企業のみなさまへ】２０２４とっとりインターンシップ企業セミナー＆個別相談会を開催します。',
    url: 'https://www.tottori-internship.net/event/20231225-copy-2-copy-2-copy-2-copy-2/',
  },
]

const infoNewsData: NewsArticle[] = [
  {
    id: 'a901i',
    date: '2025年05月14日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title: 'とっとりインターンシップ〔Instagram公式アカウント〕を開設しました  (^O^)／',
    url: 'https://www.tottori-internship.net/news/a901/',
  },
  {
    id: 'z622i',
    date: '2025年05月01日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title:
      '【学生のみなさまへ】２０２５夏もパッケージ型プログラムを実施！いろいろなテーマを持った楽しいプログラムを用意しています！',
    url: 'https://www.tottori-internship.net/news/z622/',
  },
  {
    id: 's102i',
    date: '2025年04月01日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title: '【学生のみなさまへ】２０２５新緑・夏季インターンのエントリー受付を開始します。',
    url: 'https://www.tottori-internship.net/news/s102/',
  },
  {
    id: 'y147i',
    date: '2025年03月24日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title:
      '【学生のみなさまへ】２～３月実施のプログラムには締切が迫っているものが多数ありますのでエントリーはお早めに (^^♪',
    url: 'https://www.tottori-internship.net/news/y147/',
  },
  {
    id: '233',
    date: '2025年02月01日',
    category: 'お知らせ',
    categoryClass: 'bg-ws-secondary',
    title:
      '【学生のみなさまへ】２～３月実施プログラム・スケジュールまとめ（短期型、インターンシップ〔タイプ３〕、有償型）',
    url: 'https://www.tottori-internship.net/news/233/',
  },
]

const carouselImages = [
  { url: '/root/hero-title.png', alt: '2025夏季とっとりインターンシップ' },
  { url: '/root/hero-title.png', alt: '個別相談受付中' },
  { url: '/root/hero-title.png', alt: '2025夏季とっとりインターンシップ' },
  { url: '/root/hero-title.png', alt: '個別相談受付中' },
  { url: '/root/hero-title.png', alt: '2025夏季とっとりインターンシップ' },
  { url: '/root/herotitle.png', alt: '個別相談受付中' },
]

export default function News() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const [activeTab, setActiveTab] = React.useState(0)
  const tabs = ['ALL', '相談会・配信', 'お知らせ', 'コラム・特集']
  const tabContents = [allNewsData, eventNewsData, infoNewsData, []]

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="py-6 lg:py-12 px-6 lg:px-0">
      {/* ニュース画像 */}
      <div className="w-full max-w-4xl mx-auto py-6 lg:py-12">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start', // ← 左詰にする
            slidesToScroll: 1, // ← スクロール時に何枚ずつ進めるか（1推奨）
          }}
          className="w-3/4 mx-auto lg:w-full"
        >
          <CarouselContent>
            {carouselImages.map((item, index) => (
              <CarouselItem key={index} className="flex justify-center lg:basis-1/2">
                <Image
                  src={item.url}
                  alt={item.alt}
                  width={640}
                  height={200}
                  className="rounded border shadow-md object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-12 bg-black text-white hover:bg-gray-700" />
          <CarouselNext className="-right-12 bg-black text-white hover:bg-gray-700" />

          {/* カスタムインジケーター */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === i ? 'bg-ws-primary scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* ニュース本体 */}
      <div className="py-12 lg:py-24 bg-ws-white">
        <div className="lg:max-w-6xl mx-auto lg:px-4">
          <h2 className="text-center mb-8">
            <span className="text-5xl lg:text-4xl font-thin text-gray-400 tracking-widest">
              NEWS
            </span>
            <span className="block text-xl font-bold text-gray-800 mt-1">最新情報</span>
          </h2>
          <div className="flex justify-center border-b mb-4 gap-3 lg:gap-0">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-1 lg:px-6 lg:py-2 text-base lg:text-xl font-semibold transition-colors ${activeTab === index ? 'border-b-4 border-ws-primary text-ws-primary' : 'text-gray-500 hover:text-ws-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            <NewsList articles={tabContents[activeTab]} />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-8 text-xl">
            <a
              href="https://www.tottori-internship.net/news/"
              className="bg-ws-white text-ws-primary py-2 px-6 rounded-full text-center border-2 border-ws-primary hover:opacity-70"
            >
              お知らせ一覧
            </a>
            <a
              href="https://www.tottori-internship.net/event/"
              className="bg-ws-primary text-ws-white py-2 px-6 rounded-full text-center hover:opacity-70"
            >
              イベント一覧
            </a>
            <a
              href="https://www.tottori-internship.net/column/"
              className="bg-ws-secondary text-ws-white py-2 px-6 rounded-full text-center hover:opacity-70"
            >
              コラム・特集一覧
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ニュースリスト
const NewsList = ({ articles }: { articles: NewsArticle[] }) => (
  <ul>
    {articles.length > 0 ? (
      articles.map((article) => (
        <li
          key={article.id}
          className="flex flex-col lg:flex-row item-start lg:items-center justify-start lg:justify-center border-b py-2 lg:py-5"
        >
          <div className="flex flex-row lg:items-start py-2 lg:py-5 gap-5 lg:gap-0 items-center ">
            <time className="text-gray-500 text-sm lg:mb-1 text-nowrap basis-2/12 text-right">
              {article.date}
            </time>
            <span
              className={`text-white text-xs px-2 py-1 rounded-full mx-0 sm:mx-4 my-1 basis-1/12 text-center sm:my-0 text-nowrap ${article.categoryClass}`}
            >
              {article.category}
            </span>
          </div>
          <a href={article.url} className="text-ws-black hover:underline lg:w-2/3 text-wrap">
            {article.title}
          </a>
        </li>
      ))
    ) : (
      <p className="py-4 text-gray-500">現在、記事はありません。</p>
    )}
  </ul>
)
