import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

// 記事ページの URL（フロントの siteConfig.url と同じ値。collection からフロントを import しないため直書き）
const SITE_URL = 'https://www.tuna-kan.org'

/**
 * コラム・特集（type=article）が「公開」になったとき、トップページの「お知らせ」(news) に1件自動で追加する。
 * - 追加するのは「非公開 → 公開」になった時だけ（公開済み記事の修正では追加しない）
 * - 同じ記事へのリンクの news が既にあれば追加しない（公開 → 非公開 → 公開の繰り返しで重複させない）
 */
const addNewsOnPublish: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  if (doc.type !== 'article' || !doc.published) return doc
  if (operation === 'update' && previousDoc?.published) return doc

  const link = `${SITE_URL}/articles/${doc.id}`
  const existing = await req.payload.find({
    collection: 'news',
    where: { link: { equals: link } },
    limit: 1,
    depth: 0,
    req,
  })
  if (existing.totalDocs > 0) return doc

  await req.payload.create({
    collection: 'news',
    data: {
      name: `${doc.name} の記事を公開しました。`,
      type: 'article',
      link,
      date_created: new Date().toISOString(),
    },
    req,
  })
  return doc
}

export const Article: CollectionConfig = {
  slug: 'article',
  labels: {
    singular: '記事',
    plural: '記事',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [addNewsOnPublish],
  },
  fields: [
    {
      // 公開状況
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: '公開中',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'notice',
      label: '種類',
      options: [
        { label: 'イベント', value: 'events' },
        { label: 'コラム・特集', value: 'article' },
        { label: 'お知らせ', value: 'notice' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      // 名前
      name: 'name',
      type: 'text',
      required: true,
      label: 'タイトル',
    },
    {
      // アイキャッチ（短）
      name: 'slogan_short',
      type: 'text',
      label: 'アイキャッチ',
    },
    {
      // タグ
      name: 'tags',
      type: 'relationship',
      label: 'タグ',
      hasMany: true,
      relationTo: 'articleTags',
    },
    {
      // サムネイル
      name: 'thumbnail',
      type: 'upload',
      label: 'サムネイル',
      relationTo: 'media',
    },
    {
      // キーワード
      name: 'keywords',
      type: 'array',
      label: 'キーワード',
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      // 序文
      name: 'pre',
      type: 'richText',
      label: '序文',
    },
    {
      // 本文
      name: 'main',
      type: 'richText',
      label: '本文',
    },
    {
      // 作成日
      name: 'date_created',
      type: 'date',
      label: '作成日',
    },
    {
      // 更新日
      name: 'date_updated',
      type: 'date',
      label: '更新日',
    },
    {
      // 担当者
      name: 'createdBy',
      type: 'relationship',
      label: '担当者',
      relationTo: 'articleWriter',
    },
  ],
}
