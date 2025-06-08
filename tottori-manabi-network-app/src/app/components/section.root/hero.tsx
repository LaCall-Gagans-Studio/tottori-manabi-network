'use client'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { AiOutlineQuestion } from 'react-icons/ai'
import { FiInfo } from 'react-icons/fi'

import { useState, useEffect } from 'react'

const mainSliderImages = [
  'https://cdn.pixabay.com/photo/2023/07/05/20/12/ai-generated-8109142_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/03/04/23/37/child-3199624_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/07/02/03/17/culture-6380756_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/07/05/20/12/ai-generated-8109142_1280.jpg',
]

import { Button_big } from '../button-big'

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mainSliderImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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
            <a
              href="https://www.tottori-internship.net/news/s102/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-ws-white hover:underline"
            >
              フリースクール・Sを追加しました👉🔘
            </a>
          </p>
        </div>
      </div>

      {/* ヒーローメイン */}
      <div className="px-2 lg:px-12 mx-auto py-8 lg:py-20 flex flex-col lg:flex-row items-center justify-between z-20 w-full">
        <img
          src="/root/hero-title.png"
          alt="県外の方も! 鳥取県のフリースクール・相談できる場所を探そう!"
          className="mx-auto mx-0 w-full lg:hidden order-1"
        />

        <div className="lg:w-1/2 text-center lg:text-left order-3 lg:order-1 flex flex-col items-center">
          <img
            src="/root/hero-title.png"
            alt="県外の方も! 鳥取県のフリースクール・相談できる場所を探そう!"
            className="mx-auto mx-0 w-full"
          />
          {/* メインボタン */}
          <Button_big
            text={<p>フリースクール・教育支援センターを探す</p>}
            url="#"
            props="mt-6 px-12"
          />

          {/* サブボタン */}
          <div className="mt-6 flex flex-row gap-4 px-6 lg:px-0 mb-20 lg:mb-0 justify-center lg:justify-start text-nowrap">
            <a
              href="#"
              className="px-4 flex gap-2 items-center justify-center text-left py-2 border border-gray-300 bg-ws-white rounded-full shadow text-gray-700 text-sm hover:text-ws-white hover:bg-ws-primary duration-300"
            >
              <AiOutlineQuestion className="text-lg lg:text-base" /> フリースクール
              <br className="lg:hidden" />
              とは
            </a>
            <a
              href="#"
              className="px-4 flex gap-2 items-center justify-center py-2 border border-gray-300 bg-ws-white rounded-full shadow text-gray-700 text-sm hover:text-ws-white hover:bg-ws-primary duration-300"
            >
              <FiInfo className="text-lg lg:text-base" /> お子さんが学校に
              <br className="lg:hidden" />
              行かなくなったら
            </a>
          </div>
        </div>

        <div className="relative w-5/6 lg:w-1/2 py-6 lg:py-0 lg:h-96 flex items-center justify-center overflow-hidden order-2 lg:order-2">
          {/* ← ボタン */}
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? mainSliderImages.length - 1 : prev - 1))
            }
            className="absolute left-0 lg:left-24 z-20 bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-100"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* カナ―セル */}
          <div className="relative w-96 h-60 lg:w-96 lg:h-96 overflow-hidden rounded-md border-8 border-white shadow-lg z-10">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out gap-[40px]"
              style={{
                transform: `translateX(calc(-${currentIndex} * (384px + 40px)))`,
              }}
            >
              {mainSliderImages.map((img, i) => (
                <div
                  key={i}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    opacity: i === currentIndex ? 1 : 0.3,
                    transform: i === currentIndex ? 'scale(1)' : 'scale(0.9)',
                    transition: 'opacity 0.5s, transform 0.5s',
                  }}
                >
                  <img src={img} alt={`slide-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* → ボタン */}
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === mainSliderImages.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-0 lg:right-24 z-20 bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-100"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
