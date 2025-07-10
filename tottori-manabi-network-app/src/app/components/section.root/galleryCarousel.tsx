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

export const GalleryCarousel = ({ dicts }: { dicts: any }) => {
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
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        slidesToScroll: 1,
      }}
      className="w-full"
    >
      <CarouselContent>
        {dicts
          .filter((item: any) => item.hasPage) // ← ここでfalseのものを除外
          .map((item: any, index: number) => (
            <CarouselItem
              key={index}
              className="flex justify-center basis-full lg:basis-1/3 hover:-translate-y-1 duration-300 shadow-lg group"
            >
              <a
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                href={'/dicts/' + item.id}
              >
                <div className="relative h-40 w-full">
                  <span
                    className={`absolute z-10 top-2 left-2 text-white text-xs px-2 py-1 rounded-sm bg-ws-primary`}
                  >
                    {item.address || '地域不明'}
                  </span>
                  <img
                    src={item.thumbnail?.url || '/default-image.png'}
                    alt={item.org}
                    className="object-cover w-full h-40 relative"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-1 mb-2 text-sm">
                    {item.tags?.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="bg-pink-100 text-ws-secondary text-xs px-2 py-1 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-ws-black group-hover:underline mb-2 flex-grow noopener noreferrer">
                    {item.slogan_short}
                  </h3>
                  <p className="text-xs text-gray-600">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.org}</p>
                </div>
              </a>
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
  )
}
