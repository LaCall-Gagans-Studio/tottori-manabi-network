'use client'

import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'

import { AiOutlineQuestion } from 'react-icons/ai'
import { FiInfo } from 'react-icons/fi'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button_big } from '../button-big'

const carouselImages = [
  {
    url: 'https://cdn.pixabay.com/photo/2023/07/05/20/12/ai-generated-8109142_1280.jpg',
    alt: '不登校の悩みなら【つなかん！】',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2022/01/22/13/30/mother-and-child-6957312_1280.jpg',
    alt: '個別相談受付中',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2020/12/20/09/08/girl-5846483_1280.jpg',
    alt: '不登校の悩みなら【つなかん！】',
  },
]

export default function Hero() {
  return (
    <section
      aria-label="メインビジュアル"
      className="relative z-0 overflow-hidden"
    >
      {/*
        旧: <section style={{ backgroundImage: 'url(/root/hero-bg.png)' }}> で 2.4MB の PNG を生配信。
        新: next/image の fill+priority で AVIF/WebP 変換しつつ LCP discovery を最適化。
      */}
      <Image
        src="/root/hero-bg.png"
        alt=""
        role="presentation"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover object-center -z-10"
      />

      {/* 子ども画像（装飾） */}
      <div
        aria-hidden="true"
        className="h-24 w-full absolute bottom-0 bg-repeat-x bg-contain z-10"
        style={{
          backgroundImage: "url('/root/hero-child.png')",
        }}
      />

      {/* トップお知らせ */}
      <div className="bg-ws-primary border-t border-b border-ws-secondary z-20 relative">
        <div className="max-w-6xl mx-auto text-center py-2 px-4">
          <p className="font-bold">
            <Link
              href="/dicts"
              className="text-base text-ws-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              県内フリースクール・教育支援センターの一覧はこちら👉🔘
            </Link>
          </p>
        </div>
      </div>

      {/* ヒーローメイン */}
      <div className="relative px-2 lg:px-12 mx-auto py-8 lg:py-20 flex flex-col lg:flex-row items-center justify-between z-20 w-full">
        {/* モバイルタイトル */}
        <div className="lg:hidden order-1 w-full">
          <Image
            src="/root/hero-title.png"
            alt="県外の方も! 鳥取県のフリースクール・相談できる場所を探そう!"
            width={1080}
            height={343}
            priority
            sizes="(max-width: 1024px) 92vw, 0"
            className="mx-auto h-auto w-full max-w-[693px]"
          />
        </div>

        {/* テキストとボタン */}
        <div className="lg:w-1/2 text-center lg:text-left order-3 lg:order-1 flex flex-col items-center">
          <Image
            src="/root/hero-title.png"
            alt="県外の方も! 鳥取県のフリースクール・相談できる場所を探そう!"
            width={1080}
            height={343}
            priority
            sizes="(min-width: 1024px) 50vw, 0"
            className="mx-auto hidden lg:block h-auto w-full max-w-[800px]"
          />
          <Button_big
            text={<p>フリースクール・教育支援センターを探す</p>}
            url="/dicts"
            props="mt-6 px-12"
          />

          {/* サブボタン */}
          <div className="mt-6 flex flex-row gap-4 px-6 lg:px-0 mb-20 lg:mb-0 justify-center lg:justify-start text-nowrap">
            <Link
              href="/about"
              aria-label="フリースクールとは何かを解説したページへ"
              className="px-4 flex gap-2 items-center justify-center text-left py-2 border border-gray-300 bg-ws-white rounded-full shadow text-gray-700 text-sm hover:text-ws-white hover:bg-ws-primary duration-300"
            >
              <AiOutlineQuestion className="text-lg lg:text-base" aria-hidden="true" />
              フリースクール
              <br className="lg:hidden" />
              とは
            </Link>
            <Link
              href="/articles/3"
              aria-label="お子さんが学校に行かなくなったらの解説記事へ"
              className="px-4 flex gap-2 items-center justify-center py-2 border border-gray-300 bg-ws-white rounded-full shadow text-gray-700 text-sm hover:text-ws-white hover:bg-ws-primary duration-300"
            >
              <FiInfo className="text-lg lg:text-base" aria-hidden="true" />
              お子さんが学校に
              <br className="lg:hidden" />
              行かなくなったら
            </Link>
          </div>
        </div>

        {/* カルーセル */}
        <div className="relative w-5/6 lg:w-1/2 py-6 lg:py-0 lg:h-96 flex items-center justify-center overflow-hidden order-2 lg:order-2">
          <div className="relative w-96 h-60 lg:w-96 lg:h-96 overflow-hidden rounded-md border-8 border-white shadow-lg z-10">
            <Carousel
              opts={{
                align: 'start',
                slidesToScroll: 1,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full h-full"
              aria-label="活動写真のスライドショー"
            >
              <CarouselContent>
                {carouselImages.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="relative h-full overflow-hidden w-full flex justify-center items-center"
                  >
                    <div className="relative h-56 lg:h-96 w-full">
                      <Image
                        src={item.url}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 384px, 320px"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
