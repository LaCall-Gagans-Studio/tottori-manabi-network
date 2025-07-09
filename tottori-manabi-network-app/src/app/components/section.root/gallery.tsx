// modules
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDicts } from '@/app/(frontend)/lib/getDict'

// icons
import { FiChevronDown } from 'react-icons/fi'
import { Button_big } from '../button-big'

// comps
import { GalleryCarousel } from './galleryCarousel'

export default async function Gallery() {
  const rawDicts = await getDicts()

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
          <GalleryCarousel dicts={rawDicts} />
        </div>

        <Button_big
          text={
            <p>
              すべてのフリースクール・
              <br />
              教育支援センターを探す
            </p>
          }
          url="/dicts"
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
          <Button_area text="西部" url="/dicts?tags=13" props="bg-ws-primary" />
          <Button_area text="中部" url="/dicts?tags=14" props="bg-ws-tertiary" />
          <Button_area text="東部" url="/dicts?tags=15" props="bg-ws-secondary" />
        </div>
      </div>

      {/* バナー */}
      <div className="py-12 bg-ws-white">
        <div className="max-w-5xl mx-auto px-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
            <li>
              <Link href="/dicts?recognized=true" target="_blank">
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
              <Link href="https://line.me/R/ti/p/@183ehjyb" target="_blank">
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
