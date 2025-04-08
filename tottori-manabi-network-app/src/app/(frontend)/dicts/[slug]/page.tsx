import { notFound } from 'next/navigation'
import { getDictEntryById } from '../../lib/getDictEntries'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Accordion } from './accordion'

import {
  CiUser,
  CiLocationArrow1,
  CiForkAndKnife,
  CiClock1,
  CiCoins1,
  CiCalendarDate,
  CiSquareMore,
  CiFaceSmile,
  CiBookmarkCheck,
  CiStopwatch,
} from 'react-icons/ci'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'

export default async function DictPage(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params
  const dict = await getDictEntryById(resolvedParams.slug)

  if (!dict) return notFound()

  return (
    <div className="bg-white text-black px-20">
      <h1 className="text-3xl font-bold text-ws-primary">{dict.name}</h1>
      <h2 className="text-lg">{dict.org}</h2>
      <p className="text-sm text-slate-500">{dict.address}</p>

      <div className="text-sm flex gap-1 lg:gap-2 py-2 flex-wrap">
        {/* {(dict.tags || []).map((tag: string) => (
          <div key={tag} className="bg-[#333200] px-1 py-1 rounded text-slate-50 cursor-pointer">
            {tag}
          </div>
        ))} */}
      </div>

      <div className="flex mt-6 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-72 lg:h-96">
          {/* <ImageCarousel images={dict.img} /> */}
        </div>
        <div className="w-full lg:w-3/5 p-1 ml-2">
          <h1 className="text-2xl mb-3">{dict.slogan_short}</h1>
          <h3 className="text-base whitespace-pre-wrap">{dict.slogan_long}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm lg:text-base mx-auto w-10/12 mt-12">
        <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
          <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
            <CiUser />
            <p className="text-sm lg:text-base">対象</p>
          </div>
          <div className="text-base">{dict.target}</div>
        </div>
        <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
          <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
            <CiLocationArrow1 />
            <p className="text-sm lg:text-base">送迎</p>
          </div>
          <div className="text-center">{dict.transport}</div>
        </div>
        <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
          <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
            <CiForkAndKnife />
            <p className="text-sm lg:text-base">給食</p>
          </div>
          <div className="text-center">{dict.lunch}</div>
        </div>
      </div>

      <div className="bg-ws-gray w-full lg:w-10/12 mx-auto mt-12 relative p-6">
        <FaQuoteLeft className="absolute left-1" />
        <p className="text-base lg:text-lg whitespace-pre-wrap">{dict.citation}</p>
        <FaQuoteRight className="absolute right-1" />
        <a href={dict.link} className="absolute right-0 -bottom-5 text-sm text-ws-primary">
          {dict.org} HPから
        </a>
      </div>

      <div className="flex relative flex-col lg:flex-row">
        <div className="w-full lg:w-7/12 mt-24 prose">
          <RichText data={dict.main} className="list-disc ml-24" />
        </div>
        <div className="w-11/12 lg:w-5/12 mx-auto lg:mx-0 flex flex-col justify-center items-center overflow-visible">
          {/* {dict.point} */}
          <div className="w-full lg:w-4/6 h-auto px-2 pb-3 lg:pb-1 bg-ws-gray rounded-md">
            <img src="/portfolio/kanako_anime.png" alt="可奈子ポイント" className="h-24 w-auto" />
            <div className="text-sm prose">
              <RichText data={dict.point} className="" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-sm lg:text-base lg:mt-24 flex flex-col gap-8 lg:gap-10">
        <Accordion
          icon={<CiClock1 />}
          title="時間割"
          text={<RichText data={dict.schedule} className="prose" />}
        />
        <Accordion
          icon={<CiCoins1 />}
          title="費用"
          text={<RichText data={dict.costs} className="prose" />}
        />
        <Accordion
          icon={<CiCalendarDate />}
          title="行事など"
          text={<RichText data={dict.events} className="prose" />}
        />
      </div>

      <div className="flex mt-8 lg:mt-12 text-ws-primary text-2xl items-center font-semibold gap-2">
        <CiSquareMore />
        <h2>その他</h2>
      </div>
      <div className="pl-4 flex mt-4 flex-col gap-3">
        <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
          <CiFaceSmile />
          <p>定員</p>
          <div className="text-black text-sm lg:text-base">
            {dict.capacity === 0 ? '定員上限なし' : dict.capacity}
          </div>
        </div>
        <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
          <CiBookmarkCheck />
          <p>認定の有無</p>
          <div className="text-black text-sm lg:text-base">
            {dict.recognition ? '認定済み' : 'まだ認定されていません'}
          </div>
        </div>
        <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
          <CiStopwatch />
          <p>設立年月日</p>
          <div className="text-black text-sm lg:text-base">{dict.date_launch}</div>
        </div>
      </div>

      <div className="flex items-center justify-center my-11">
        {/* <GoogleMapEmbed location={dict.location} width="80%" height="160" /> */}
      </div>
    </div>
  )
}
