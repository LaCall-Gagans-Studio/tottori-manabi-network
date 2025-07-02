'use client'

// modules
import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'

// icons
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
    url: 'https://cdn.pixabay.com/photo/2018/03/04/23/37/child-3199624_1280.jpg',
    alt: '個別相談受付中',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2020/12/20/09/08/girl-5846483_1280.jpg',
    alt: '不登校の悩みなら【つなかん！】',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2023/07/05/20/12/ai-generated-8109142_1280.jpg',
    alt: '個別相談受付中',
  },
]

export default function Hero() {
  return (
    <section
      className="bg-cover bg-center relative z-0"
      style={{
        backgroundImage: "url('/root/hero-bg.png')",
      }}
    >
      {/* 子ども画像 */}
      <div
        className="h-24 w-full absolute bottom-0 bg-repeat-x bg-contain z-10"
        style={{
          backgroundImage: "url('root/hero-child.png')",
        }}
      />

      {/* トップお知らせ */}
      <div className="bg-ws-primary border-t border-b border-ws-secondary z-20">
        <div className="max-w-6xl mx-auto text-center py-2 px-4">
          <p className="font-bold">
            <Link
              href="/dicts/4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-ws-white hover:underline"
            >
              フリースクールこ・ラボを追加しました👉🔘
            </Link>
          </p>
        </div>
      </div>

      {/* ヒーローメイン */}
      <div className="px-2 lg:px-12 mx-auto py-8 lg:py-20 flex flex-col lg:flex-row items-center justify-between z-20 w-full">
        {/* モバイルタイトル */}
        <div className="lg:hidden order-1 w-full">
          <Image
            src="/root/hero-title.png"
            alt="県外の方も! 鳥取県のフリースクール・相談できる場所を探そう!"
            width={800}
            height={200}
            className="mx-auto lg:hidden"
          />
        </div>

        {/* テキストとボタン */}
        <div className="lg:w-1/2 text-center lg:text-left order-3 lg:order-1 flex flex-col items-center">
          <Image
            src="/root/hero-title.png"
            alt="県外の方も! 鳥取県のフリースクール・相談できる場所を探そう!"
            width={800}
            height={200}
            className="mx-auto hidden lg:block"
          />
          <Button_big
            text={<p>フリースクール・教育支援センターを探す</p>}
            url="/dicts"
            props="mt-6 px-12"
          />

          {/* サブボタン */}
          <div className="mt-6 flex flex-row gap-4 px-6 lg:px-0 mb-20 lg:mb-0 justify-center lg:justify-start text-nowrap">
            <Link
              href="#"
              className="px-4 flex gap-2 items-center justify-center text-left py-2 border border-gray-300 bg-ws-white rounded-full shadow text-gray-700 text-sm hover:text-ws-white hover:bg-ws-primary duration-300"
            >
              <AiOutlineQuestion className="text-lg lg:text-base" />
              フリースクール
              <br className="lg:hidden" />
              とは
            </Link>
            <Link
              href="#"
              className="px-4 flex gap-2 items-center justify-center py-2 border border-gray-300 bg-ws-white rounded-full shadow text-gray-700 text-sm hover:text-ws-white hover:bg-ws-primary duration-300"
            >
              <FiInfo className="text-lg lg:text-base" />
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
            >
              <CarouselContent className=" ">
                {carouselImages.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="relative h-full  overflow-hidden w-full flex justify-center items-center"
                  >
                    <div className="h-56 lg:h-96">
                      <Image src={item.url} alt={item.alt} fill={true} className="object-cover" />
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
