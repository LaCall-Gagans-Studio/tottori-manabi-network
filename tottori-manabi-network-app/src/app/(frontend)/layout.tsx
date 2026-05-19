// src/app/(frontend)/layout.tsx
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { Zen_Kaku_Gothic_New, M_PLUS_Rounded_1c } from 'next/font/google'
import './styles.css'
import { siteConfig } from './siteConfig'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { JsonLd, buildOrganizationSchema, buildWebSiteSchema } from './JsonLd'

/*
  next/font による Google Fonts のセルフホスト化。
  - CSS @import を完全に廃止し、レンダーブロック (Lighthouse: Render blocking requests ~8.5s) を解消。
  - display: 'swap' で FOIT を抑止し FCP/LCP を改善。
  - preload: true で重要 woff2 のみを先行取得。
  - subsets を 'latin' のみに限定 (日本語は unicode-range 戦略で本体 CSS が分割ロード)。
*/
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-zen',
  fallback: ['Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'sans-serif'],
})

const mplus = M_PLUS_Rounded_1c({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-mplus',
  fallback: ['Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'sans-serif'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#5c8d34',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.siteName}`,
  },

  description: siteConfig.description,
  keywords: siteConfig.keywords,

  applicationName: siteConfig.siteName,
  authors: [{ name: 'とっとりフリースクールネットワーク', url: siteConfig.url }],
  creator: 'とっとりフリースクールネットワーク',
  publisher: 'とっとりフリースクールネットワーク',
  category: 'education',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteConfig.url,
    title: `【鳥取の保護者様へ】お子様に合うフリースクールが見つかる｜${siteConfig.siteName}`,
    description: siteConfig.description,
    siteName: siteConfig.siteName,
    images: [
      {
        url: '/logo.png',
        width: 600,
        height: 600,
        alt: `${siteConfig.siteName}のロゴ`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: `@${siteConfig.twitterId}`,
    title: `【鳥取の保護者様へ】お子様に合うフリースクールが見つかる｜${siteConfig.siteName}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/logo.png`],
  },

  verification: {
    google: 'EzH28jpTZShqeDUipsnA9Hjd5yTcKMGEPQQ4hkPLjFU',
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${mplus.variable}`}>
      <head>
        {/*
          Google Tag Manager 用ドメインの preconnect。
          gstatic / googleapis は next/font セルフホスト化により不要。
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [buildWebSiteSchema(), buildOrganizationSchema()],
          }}
        />
      </head>
      <body className="bg-slate-50">
        {children}
        <Analytics />
        {/*
          GA は LCP 後にロード。afterInteractive → lazyOnload に変更し
          Lighthouse の "Reduce unused JavaScript (66 KiB)" を改善。
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CKW0PM7XRJ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKW0PM7XRJ');
          `}
        </Script>
      </body>
    </html>
  )
}
