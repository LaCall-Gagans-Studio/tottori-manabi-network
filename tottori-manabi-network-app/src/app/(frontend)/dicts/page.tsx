import { getDictEntries } from '../lib/getDictEntries'

// icon
import { CiLocationOn, CiUser } from 'react-icons/ci'

export default async function DictsPage() {
  const entries = await getDictEntries()

  return (
    <div className="p-4 pt-4 lg:pt-12 h-[calc(100svh*11/12)] lg:h-full w-full mx-auto overflow-y-scroll bg-[#f8fdee] lg:bg-transparent z-20">
      <div className="w-full lg:max-w-[800px] lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-6 lg:gap-8 items-center relative">
        {entries.map((entry) => (
          <a
            key={entry.id}
            href={`http://localhost:3000/dicts/${entry.id}`}
            className="h-48 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
          >
            <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-1 lg:group-hover:-translate-x-8 transition-all">
              <img
                className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center"
                src={entry.thumbnail?.url}
                alt="画像がありません"
              />

              <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">
                <h1 className="text-base lg:text-2xl font-bold text-ws-primary text-nowrap">
                  {entry.name}
                </h1>
                <h2 className="text-xs lg:text-base font-medium text-slate-600 text-nowrap">
                  {entry.slogan_short}
                </h2>
                <h2 className="mt-1 text-xs lg:text-sm w-full font-thin text-slate-600 text-nowrap  group-hover:animate-marquee ">
                  {entry.slogan_long ? entry.slogan_long : '詳細がありません'}
                </h2>

                <div className="mt-2 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <CiUser className="text-ws-primary" />
                    <p className="text-xs lg:text-sm font-normal text-slate-400">
                      {entry.target ? entry.target : '対象が未設定'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <CiLocationOn className="text-ws-primary" />
                    <p className="text-xs lg:text-sm font-normal text-slate-400 text-nowrap overflow-hidden">
                      {entry.address}
                    </p>
                  </div>

                  <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap lg:flex-nowrap gap-1 lg:gap-2 lg:font-semibold text-slate-600">
                    {entry.tags?.map((tag) => (
                      <p key={tag.name} className="bg-black px-1 py-1 rounded text-slate-50">
                        {tag.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full w-16 flex items-center bg-ws-black absolute right-0 top-0 z-0 rounded-r-lg">
              <p className="text-right w-6 ml-auto pr-2 font-bold text-white">詳細を見る</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
