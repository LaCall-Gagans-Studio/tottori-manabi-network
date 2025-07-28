'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'

// ImageCarousel
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

type CarouselImage = {
  id: number
  alt: string
  url: string
}

export function ImageCarousel({ imgs }: { imgs: CarouselImage[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = React.useState(0)

  // 5秒ごとに自動スライド
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!api) return
      const nextIndex = (currentIndex + 1) % imgs.length
      api.scrollTo(nextIndex)
      setCurrentIndex(nextIndex)
    }, 5000)

    return () => clearInterval(interval)
  }, [api, currentIndex, imgs.length])

  // ドットを押したとき
  const goToSlide = (index: number) => {
    if (!api) return
    api.scrollTo(index)
    setCurrentIndex(index)
  }

  return (
    <div className="w-full flex flex-col items-center relative  border border-ws-black bg-ws-black">
      <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="h-72 lg:h-96">
          {imgs.map((img) => (
            <CarouselItem key={img.id} className="basis-full flex items-center justify-center">
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover rounded p-1" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* ドットインジケーター */}
      <div className="flex mt-2 space-x-2 absolute bottom-2">
        {imgs.map((_, index) => (
          <button
            key={index}
            aria-label={`スライド${index + 1}`}
            className={`h-4 w-4 rounded-full transition-colors ${
              currentIndex === index ? 'bg-ws-primary' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Accordion
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
export const Accordion: React.FC<{ icon: React.ReactNode; title: string; text: ReactNode }> = ({
  icon: Icon,
  title,
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <div className="flex text-ws-primary text-2xl items-center font-semibold gap-2">
        {Icon}
        <h2>{title}</h2>
        <div className="lg:hidden" onClick={toggleExpanded}>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <div className={`ml-3 mt-2 ${isExpanded ? 'block' : 'hidden'} lg:block`}>{text}</div>
    </div>
  )
}

//googleMapEmbed
export const GoogleMapEmbed: React.FC<{
  location: string[]
  width?: string
  height?: string
}> = ({ location, width, height }) => {
  if (!location) return <p className="text-sm text-gray-400">地図情報がありません</p>

  const mapSrc = `https://maps.google.co.jp/maps?&q=${location[0]},${location[1]}&output=embed&t=m&z=17`

  return (
    <iframe
      width={width}
      height={height}
      src={mapSrc}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}

// TimestampFormat
export const FormatDate: React.FC<{ date: string }> = ({ date }) => {
  const formatted = new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return formatted
}

// DictTargetsConverts
import { DictTarget } from '@/payload-types'
export const DictTargetsConverts: React.FC<{ targets: DictTarget[] }> = ({ targets }) => {
  if (!targets || targets.length === 0) return null

  const first = targets[0]
  const last = targets[targets.length - 1]

  return (
    <div className="flex gap-2">
      <p>{first.name}</p>
      {first.id !== last.id && (
        <>
          <p>～</p>
          <p>{last.name}</p>
        </>
      )}
    </div>
  )
}

// Tooltips
export const Tooltips: React.FC<{ main: ReactNode }> = ({ main }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <>
      {/* はてなマークアイコンとカスタムツールチップ */}
      <div
        className="ml-2 relative"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <FaQuestionCircle className="text-gray-500 cursor-pointer" />
        {isTooltipVisible && (
          <div className="absolute top-full lg:left-0 right-0 mt-1 w-56 p-2 bg-ws-primary text-white text-xs rounded shadow-lg z-10">
            {main}
          </div>
        )}
      </div>
    </>
  )
}
