'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { Dicts } from '@/app/(frontend)/lib/getDict'

/*
  旧実装は React.useMemo 内で Math.random().sort() を行っており、
  SSR と CSR で順序が異なるため React error #418 (hydration mismatch) を引き起こしていました。
  対応: 初回レンダーでは安定順序で表示し、マウント後にのみシャッフルします。
*/
export const GalleryCarousel = ({ dicts }: { dicts: Dicts[] }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const baseDicts = React.useMemo(
    () => (dicts ?? []).filter((item) => item.hasPage),
    [dicts],
  )

  const [orderedDicts, setOrderedDicts] = React.useState<Dicts[]>(baseDicts)

  React.useEffect(() => {
    const shuffled = [...baseDicts]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setOrderedDicts(shuffled)
  }, [baseDicts])

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        slidesToScroll: 1,
      }}
      className="w-full"
      aria-label="ピックアップ施設"
    >
      <CarouselContent>
        {orderedDicts.map((item, index) => (
          <CarouselItem
            key={item.id ?? index}
            className="flex justify-center basis-full lg:basis-1/3 hover:-translate-y-1 duration-300 shadow-lg group"
          >
            <a
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-full"
              href={'/dicts/' + item.id}
            >
              <div className="relative h-40 w-full">
                <span className="absolute z-10 top-2 left-2 text-white text-xs px-2 py-1 rounded-sm bg-ws-primary">
                  {item.address || '地域不明'}
                </span>
                <Image
                  src={item.thumbnail?.url || '/logo.png'}
                  alt={item.org ?? item.name ?? '施設サムネイル'}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-1 mb-2 text-sm">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-pink-100 text-ws-secondary text-xs px-2 py-1 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-ws-black group-hover:underline mb-2 flex-grow">
                  {item.slogan_short}
                </h3>
                <p className="text-xs text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-600 mt-1">{item.org}</p>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        aria-label="前の施設"
        className="left-0 lg:-left-12 bg-black text-white hover:bg-gray-700"
      />
      <CarouselNext
        aria-label="次の施設"
        className="right-0 lg:-right-12 bg-black text-white hover:bg-gray-700"
      />

      <div
        className="flex justify-center mt-4 gap-2 w-full"
        role="tablist"
        aria-label="スライドインジケーター"
      >
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            role="tab"
            aria-selected={current === i}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i ? 'bg-ws-primary scale-125' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </Carousel>
  )
}
