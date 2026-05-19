// library
import React from 'react'

// components
import Header from '../components/header'
import Hero from '../components/section.root/hero'
import DailyMessage from '../components/section.root/dailyMessage'
import News from '../components/section.root/news'
import Gallery from '../components/section.root/gallery'
import About from '../components/section.root/about'
import Links from '../components/section.root/links'
import Footer from '../components/footer'
import { JsonLd, buildBreadcrumbSchema } from './JsonLd'
import { siteConfig } from './siteConfig'

/*
  ページ全体は他フェッチ (News/Dicts: revalidate 60) によって最短 60 秒で再生成されます。
  DailyMessage は内部で unstable_cache(revalidate: 86400, key=JST日付) を使用しているため、
  ページが頻繁に再生成されても 1 日 1 回しかコンテンツは切り替わりません。
*/
export default async function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main id="main" tabIndex={-1}>
        <h1 className="sr-only">
          {siteConfig.siteName}｜鳥取県のフリースクール・教育支援センター情報ポータル
        </h1>
        <Hero />
        <DailyMessage />
        <News />
        <Gallery />
        <About />
        <Links />
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteConfig.url}/#webpage`,
          url: siteConfig.url,
          name: siteConfig.title,
          description: siteConfig.description,
          inLanguage: 'ja',
          isPartOf: { '@id': `${siteConfig.url}/#website` },
          about: { '@id': `${siteConfig.url}/#organization` },
          breadcrumb: buildBreadcrumbSchema([{ name: 'ホーム', url: '/' }]),
        }}
      />
    </div>
  )
}
