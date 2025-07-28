// src/app/layout.tsx
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './styles.css'
import { siteConfig } from './siteConfig'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.siteName}`,
  },

  description: siteConfig.description,
  keywords: siteConfig.keywords,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
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
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteConfig.title,
      url: siteConfig.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.siteName,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
        width: 600,
        height: 600,
      },
      description:
        '鳥取県内のフリースクール情報を網羅するポータルサイト。元教員の運営者が、不登校や多様な学びを求める子どもたちと保護者に寄り添い、信頼できる情報を提供します。',
    },
  ],
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-slate-50">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
