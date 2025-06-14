'use client'

// modules
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

// icons
import { FiChevronDown } from 'react-icons/fi'
import { Button_big } from '../button-big'

interface Internship {
  id: number
  area: string
  areaClass: string
  imageUrl: string
  programUrl: string
  tags: string[]
  title: string
  company: string
  industry: string
}

const pickupInternships: Internship[] = [
  {
    id: 1,
    area: '東部',
    areaClass: 'bg-red-500',
    imageUrl: '/root/gallery-area.png',
    programUrl: 'https://www.tottori-internship.net/search/program/3104/',
    tags: ['ワンデー仕事研究'],
    title: '【工事監督】ワンデー　建築、土木の工事監督の仕事とは（4～6月開催）',
    company: '大和建設株式会社',
    industry: 'まちづくり',
  },
  {
    id: 2,
    area: '西部',
    areaClass: 'bg-blue-500',
    imageUrl: '/root/gallery-area.png',
    programUrl: 'https://www.tottori-internship.net/search/program/3092/',
    tags: ['ワンデー仕事研究'],
    title: '【３ｈ】日本海三菱 〇〇体験ツアー！！in 米子二本木店',
    company: '日本海三菱自動車販売株式会社',
    industry: 'その他',
  },
  {
    id: 3,
    area: '東部',
    areaClass: 'bg-red-500',
    imageUrl: '/root/gallery-area.png',
    programUrl: 'https://www.tottori-internship.net/search/program/3259/',
    tags: ['留学生受入', 'ワンデー仕事研究'],
    title: 'お手軽にご参加ください！企業研究＆店舗見学コース　★昼食付★',
    company: '株式会社マルイ',
    industry: 'サービス(販売・福祉含む)',
  },
  {
    id: 4,
    area: '東部',
    areaClass: 'bg-red-500',
    imageUrl: '/root/gallery-area.png',
    programUrl: 'https://www.tottori-internship.net/search/program/3282/',
    tags: [],
    title: '地域密着の新聞社の業務と魅力を知ろう',
    company: '株式会社新日本海新聞社',
    industry: 'まちづくり',
  },
  {
    id: 5,
    area: '東部',
    areaClass: 'bg-red-500',
    imageUrl: '/root/gallery-area.png',
    programUrl: 'https://www.tottori-internship.net/search/program/3065/',
    tags: ['ワンデー仕事研究'],
    title: '2025春より:1dayオープンカンパニー開催します！ホンダカーズ山陰中央株式会社です',
    company: 'ホンダ山陰中央株式会社',
    industry: 'サービス(販売・福祉含む)',
  },
  {
    id: 6,
    area: '東部',
    areaClass: 'bg-red-500',
    imageUrl: '/root/gallery-area.png',
    programUrl: 'https://www.tottori-internship.net/search/program/3225/',
    tags: ['ワンデー仕事研究'],
    title: '8/19～21開催　★3Dプリンタを使った世界に1つだけのオリジナルスマホスタンド製作★',
    company: '気高電機株式会社',
    industry: 'ものづくり',
  },
]

export default function Gallery() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="w-full">
      {/* ピックアップゾーン */}
      <div
        className="px-4 py-24 bg-cover bg-center"
        style={{
          backgroundImage: "url('/root/gallery-bg.png')",
        }}
      >
        <h2 className="text-center pb-10 relative">
          <span className="text-5xl lg:text-4xl font-thin text-gray-400 tracking-widest">
            SPACES
          </span>
          <span className="block text-xl font-bold text-gray-800 mt-1">
            フリースクール・教育支援センター
          </span>
          <div className="absolute -top-4 lg:-top-16 right-1/2 translate-x-40 lg:w-20 w-12">
            <Image src="/root/gallery-pickup.png" alt="Pick up!" width={80} height={80} />
          </div>
        </h2>

        <div className="w-full px-5 lg:px-0 max-w-4xl mx-auto py-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent>
              {pickupInternships.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center basis-full lg:basis-1/3 hover:-translate-y-1 duration-300 shadow-lg"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                    <div className="relative">
                      <span
                        className={`absolute top-2 left-2 text-white text-base px-3 py-3 rounded-full ${item.areaClass}`}
                      >
                        {item.area}
                      </span>
                      <Link href={item.programUrl} target="_blank" rel="noopener noreferrer">
                        <div className="w-full h-48 relative">
                          <Image
                            src={item.imageUrl}
                            alt={item.company}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-ws-black hover:underline mb-2 flex-grow">
                        <Link href={item.programUrl} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">{item.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.industry}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 lg:-left-12 bg-black text-white hover:bg-gray-700" />
            <CarouselNext className="right-0 lg:-right-12 bg-black text-white hover:bg-gray-700" />

            <div className="flex justify-center mt-4 gap-2 w-full">
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

        <Button_big
          text={
            <p>
              すべてのフリースクール・
              <br />
              教育支援センターを探す
            </p>
          }
          url="#"
          props="mt-12 text-center text-xl"
        />
      </div>

      {/* エリア */}
      <div className="relative bg-cover bg-center h-auto w-full">
        <Image
          src="/root/gallery-area.png"
          alt="鳥取県の地図"
          width={1200}
          height={500}
          className="hidden lg:block w-full h-auto"
        />
        <Image
          src="/root/gallery-area-sm.png"
          alt="鳥取県の地図"
          width={600}
          height={400}
          className="relative lg:hidden w-full h-auto"
        />
        <div className="absolute right-7 top-4 lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-3/4 w-16 lg:w-24">
          <Image
            src="/root/gallery-area-choose.png"
            alt="探したいエリアを選択!"
            width={96}
            height={96}
          />
        </div>
        <div className="max-w-4xl flex mx-auto lg:mx-0 px-4 absolute z-10 bottom-10 left-1/2 -translate-x-1/2 lg:translate-x-20 lg:top-1/2 lg:-translate-y-3 lg:right-0 gap-8 lg:gap-20">
          <Button_area text="西部" url="#" props="bg-ws-primary" />
          <Button_area text="中部" url="#" props="bg-ws-tertiary" />
          <Button_area text="東部" url="#" props="bg-ws-secondary" />
        </div>
      </div>

      {/* バナー */}
      <div className="py-12 bg-ws-white">
        <div className="max-w-5xl mx-auto px-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
            <li>
              <Link href="https://www.tottori-internship.net/manual/#a_subsidy" target="_blank">
                <Image
                  src="/root/gallery-recognized.png"
                  alt="通学費用が半額に！認定フリースクール一覧"
                  width={600}
                  height={300}
                  className="w-full hover:opacity-90 transition-opacity"
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.tottori-internship.net/accounts/signup/" target="_blank">
                <Image
                  src="/root/gallery-line.png"
                  alt="はじめての方へ まずはLINE登録"
                  width={600}
                  height={300}
                  className="w-full hover:opacity-90 transition-opacity"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const Button_area = ({ text, url, props }: { text: string; url: string; props: string }) => {
  return (
    <div className="text-center">
      <Link
        href={url}
        className={`p-4 flex flex-col justify-center border-ws-black items-center border-2  lg:w-32 lg:h-32 rounded-full text-center backdrop-blur-sm hover:opacity-70 duration-300 ${props}`}
      >
        <span className="text-ws-white font-bold text-xl lg:text-2xl">{text}</span>
        <span className="text-ws-white font-medium text-sm lg:text-lg mb-2 text-nowrap">
          施設一覧
        </span>
        <FiChevronDown className="text-2xl lg:text-3xl text-ws-white" />
      </Link>
    </div>
  )
}
