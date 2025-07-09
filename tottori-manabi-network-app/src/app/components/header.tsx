'use client'

// modules
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// icons
import { FaLine, FaInstagram } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'つなかんとは？', href: '/about' },
    { label: 'フリースクール等・支援機関検索', href: '/dicts' },
    { label: 'みんなの声', href: '/ongoing' },
    { label: 'イベント・相談会', href: '/ongoing' },
  ]

  return (
    <header className="w-full shadow z-50 bg-white">
      {/* PC表示 */}
      <div className="hidden lg:block justify-between items-center w-full mt-2 pb-3">
        <div className="flex justify-around items-center px-6 py-6 h-24">
          {/* ロゴ */}
          <Link href="/" className="text-2xl font-bold">
            <Image src="/logo-long.png" alt="logo" width={500} height={100} />
          </Link>

          {/* SNSアイコン */}
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex justify-between items-center space-x-2">
              <a href="https://line.me/R/ti/p/@183ehjyb">
                <FaLine className="ml-4 text-3xl text-green-500" />
              </a>
              <a href="https://www.instagram.com/tottori.manabi.network?igsh=MXd3NTNtbWJmejlwbA==">
                <FaInstagram className="text-3xl text-black" />
              </a>
            </div>
            {/* CTAボタン */}
            <a
              href="/ongoing"
              className="ml-4 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full text-xl"
            >
              不登校になったら
            </a>
          </div>
        </div>

        {/* ナビゲーション */}
        <nav className="flex items-center justify-center space-x-4 px-12 w-full mt-2">
          <Link href="/" className="font-bold text-lg hover:underline">
            HOME
          </Link>
          {navItems.map((item, i) => (
            <div key={i} className="flex items-center space-x-4 text-lg">
              <span className="text-ws-primary text-4xl font-thin">/</span>
              <Link href={item.href} className="font-semibold hover:underline">
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* モバイル表示 */}
      <div className="lg:hidden w-full">
        <div className="text-2xl font-bold h-16 flex items-center justify-start">
          <Link href="/">
            <Image
              src="/logo-long.png"
              alt="logo"
              width={300}
              height={60}
              className="py-2 px-2 object-contain"
            />
          </Link>
        </div>

        {/* スライドメニュー */}
        <div
          className={`fixed top-0 right-0 h-full w-full flex z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-16' : 'translate-x-full'}`}
        >
          <div className="relative bg-white w-[calc(100%-4rem)]">
            {/* メニューボタン */}
            <button
              className={`
              font-bold absolute z-50 w-16 top-0 h-16 flex flex-col justify-center items-center
              bg-ws-primary text-white px-1 py-3
              transition-transform duration-300 ease-in-out -left-16
            `}
            >
              <div className="flex justify-center w-full h-8">
                <RxCross1
                  onClick={() => setIsOpen(false)}
                  className={`w-8 h-8 ${isOpen ? 'block' : 'hidden'}`}
                />
                <RxHamburgerMenu
                  onClick={() => setIsOpen(true)}
                  className={`w-8 h-8 ${isOpen ? 'hidden' : 'block'}`}
                />
              </div>
              <span className="text-sm">MENU</span>
            </button>

            {/* ナビゲーション */}
            <nav className="flex flex-col space-y-4 text-base font-medium w-full  ">
              <Link href="/" className="border-b py-4 px-4 bg-slate-100 text-slate-500 text-sm">
                HOME
              </Link>
              {navItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 px-4 py-2 border-b pb-2 text-lg whitespace-pre-wrap"
                >
                  <span className="text-ws-primary text-2xl font-normal">/</span>
                  <Link href={item.href}>{item.label}</Link>
                </div>
              ))}
            </nav>

            {/* ボタン群 */}
            <div className="flex flex-col items-center mt-6 space-y-3 px-4">
              <button className="flex items-center text-lg justify-center w-full py-2 bg-cyan-500 text-white font-bold rounded-full">
                <FaSearch className="mr-2 " /> フリースクールを探す
              </button>
              <button className="w-full text-lg py-2 bg-rose-400 text-white font-bold rounded-full">
                不登校になったら
              </button>
              <div className="flex gap-4 pt-2">
                <a href="https://line.me/R/ti/p/@183ehjyb">
                  <FaLine className="text-4xl text-green-500" />
                </a>
                <a href="https://www.instagram.com/tottori.manabi.network?igsh=MXd3NTNtbWJmejlwbA==">
                  <FaInstagram className="text-4xl text-black" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* オーバーレイ */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </header>
  )
}
