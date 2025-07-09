import type { CollectionConfig } from 'payload'

export const ArticleWriter: CollectionConfig = {
  slug: 'articleWriter',
  labels: {
    singular: '記事ライター',
    plural: '記事ライター',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      // 名前
      name: 'name',
      type: 'text',
      required: true,
      label: '名前',
    },
    {
      // 役職
      name: 'position',
      type: 'text',
      required: true,
      label: '役職',
    },
    {
      // アイコン
      name: 'icon',
      type: 'upload',
      label: 'アイコン',
      relationTo: 'media',
    },
    {
      // プロフィール
      name: 'main',
      type: 'richText',
      label: 'プロフィール',
    },
  ],
}
