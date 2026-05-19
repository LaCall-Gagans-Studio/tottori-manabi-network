'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FaInstagram } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'つなかんとは？', href: '/about' },
    { label: 'フリースクール等・支援機関検索', href: '/dicts' },
    { label: 'コラム', href: '/articles' },
    { label: 'イベント・相談会', href: '/events' },
  ]

  return (
    <header className="w-full shadow z-50 bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-ws-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        メインコンテンツへスキップ
      </a>

      {/* PC表示 */}
      <div className="hidden lg:block justify-between items-center w-full mt-2 pb-3">
        <div className="flex justify-around items-center px-6 py-6 h-24">
          <Link
            href="/"
            aria-label="つなかん トップページへ"
            className="text-2xl font-bold hover:opacity-50 duration-300"
          >
            <Image
              src="/logo-long.png"
              alt="つなかん"
              width={500}
              height={100}
              priority
              sizes="(min-width: 1024px) 500px, 300px"
            />
          </Link>

          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex justify-between items-center space-x-2">
              <a
                href="https://www.instagram.com/tunakan_tottori/"
                aria-label="つなかん公式 Instagram を新しいタブで開く"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 inline-flex"
              >
                <FaInstagram
                  className="text-3xl text-black hover:opacity-50 duration-300"
                  aria-hidden="true"
                />
              </a>
            </div>
            <Link
              href="/articles/3"
              className="ml-4 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-xl"
            >
              不登校になったら
            </Link>
          </div>
        </div>

        <nav className="flex items-center justify-center space-x-4 px-12 w-full mt-2" aria-label="メインナビゲーション">
          <Link href="/" className="font-bold text-lg hover:underline px-3 py-2">
            HOME
          </Link>
          {navItems.map((item, i) => (
            <div key={i} className="flex items-center space-x-4 text-lg">
              <span aria-hidden="true" className="text-ws-primary text-4xl font-thin">
                /
              </span>
              <Link href={item.href} className="font-semibold hover:underline px-3 py-2">
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* モバイル表示 */}
      <div className="lg:hidden w-full">
        <div className="text-2xl font-bold h-16 flex items-center justify-start">
          <Link href="/" aria-label="つなかん トップページへ">
            <Image
              src="/logo-long.png"
              alt="つなかん"
              width={300}
              height={60}
              priority
              sizes="300px"
              className="py-2 px-2 object-contain hover:opacity-50 duration-300"
            />
          </Link>
        </div>

        {/* スライドメニュー */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-full flex z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-16' : 'translate-x-full'}`}
          aria-hidden={!isOpen}
        >
          <div className="relative bg-white w-[calc(100%-4rem)]">
            <button
              type="button"
              aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="font-bold absolute z-50 w-16 top-0 h-16 flex flex-col justify-center items-center bg-ws-primary text-white px-1 py-3 transition-transform duration-300 ease-in-out -left-16"
            >
              <span className="flex justify-center w-full h-8">
                {isOpen ? (
                  <RxCross1 className="w-8 h-8" aria-hidden="true" />
                ) : (
                  <RxHamburgerMenu className="w-8 h-8" aria-hidden="true" />
                )}
              </span>
              <span className="text-sm">MENU</span>
            </button>

            <nav className="flex flex-col space-y-4 text-base font-medium w-full" aria-label="モバイルメニュー">
              <Link
                href="/"
                className="border-b py-4 px-4 bg-slate-100 text-slate-700 text-sm hover:text-ws-primary duration-300"
              >
                HOME
              </Link>
              {navItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 px-4 py-2 border-b pb-2 text-lg whitespace-pre-wrap"
                >
                  <span aria-hidden="true" className="text-ws-primary text-2xl font-normal">
                    /
                  </span>
                  <Link href={item.href} className="hover:text-ws-primary duration-300">
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex flex-col items-center mt-6 space-y-3 px-4">
              <Link
                href="/dicts"
                className="flex items-center text-lg justify-center w-full py-2 bg-cyan-700 hover:bg-cyan-800 duration-300 text-white font-bold rounded-full"
              >
                <FaSearch className="mr-2" aria-hidden="true" /> フリースクールを探す
              </Link>
              <Link
                href="/articles/3"
                className="w-full text-lg py-2 flex justify-center bg-rose-600 hover:bg-rose-700 duration-300 text-white font-bold rounded-full"
              >
                不登校になったら
              </Link>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/tunakan_tottori/"
                  aria-label="つなかん公式 Instagram を新しいタブで開く"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 inline-flex"
                >
                  <FaInstagram
                    className="text-4xl text-black hover:opacity-50 duration-300"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  )
}
