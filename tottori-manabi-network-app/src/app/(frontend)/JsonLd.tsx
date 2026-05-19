import { siteConfig } from './siteConfig'

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Schema.org 構造化データ (JSON-LD) を SSR で安全に埋め込むためのサーバーコンポーネント。
 * - script タグで埋め込むため、ハイドレーション差分の影響を受けません。
 * - XSS 防止のため、`<` のみを Unicode エスケープしています。
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

/* ========== 各ページ用 JSON-LD ビルダー ========== */

export const buildOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.siteName,
  alternateName: 'とっとりフリースクールネットワーク',
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/logo.png`,
    width: 600,
    height: 600,
  },
  sameAs: ['https://www.instagram.com/tunakan_tottori/'],
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
    addressRegion: '鳥取県',
    addressLocality: '鳥取市',
    streetAddress: '南吉方3丁目215番地',
    postalCode: '680-0843',
  },
  email: 'tottori.manabi.network@gmail.com',
})

export const buildWebSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.siteName,
  url: siteConfig.url,
  inLanguage: 'ja',
  publisher: { '@id': `${siteConfig.url}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/dicts?keyword={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

type BreadcrumbItem = { name: string; url: string }
export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
  })),
})

type FaqItem = { question: string; answer: string }
export const buildFaqSchema = (items: FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
})

type ArticleSchemaInput = {
  title: string
  description: string
  image: string
  url: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}
export const buildArticleSchema = ({
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
  authorName,
}: ArticleSchemaInput) => ({
  '@type': 'Article',
  headline: title,
  description,
  image: [image],
  datePublished,
  dateModified: dateModified ?? datePublished,
  author: authorName
    ? { '@type': 'Person', name: authorName }
    : { '@id': `${siteConfig.url}/#organization` },
  publisher: { '@id': `${siteConfig.url}/#organization` },
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  inLanguage: 'ja',
})

type EducationalOrgSchemaInput = {
  name: string
  description: string
  url: string
  image?: string
  address?: string
  org?: string
}
export const buildEducationalOrgSchema = ({
  name,
  description,
  url,
  image,
  address,
  org,
}: EducationalOrgSchemaInput) => ({
  '@type': 'EducationalOrganization',
  name,
  description,
  url,
  image,
  parentOrganization: org,
  address: address
    ? {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '鳥取県',
        streetAddress: address,
      }
    : undefined,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '鳥取県',
  },
})

type ItemListSchemaInput = {
  url: string
  items: { name: string; url: string }[]
}
export const buildItemListSchema = ({ url, items }: ItemListSchemaInput) => ({
  '@type': 'ItemList',
  '@id': `${url}#itemlist`,
  numberOfItems: items.length,
  itemListElement: items.slice(0, 100).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
  })),
})
