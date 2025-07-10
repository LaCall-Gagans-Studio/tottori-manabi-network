import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'お知らせ',
    plural: 'お知らせ',
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
      label: 'タイトル',
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
    },
    {
      // リンク
      name: 'link',
      type: 'text',
      required: true,
      label: 'リンク',
    },
    {
      // 作成日
      name: 'date_created',
      type: 'date',
      required: true,
      label: '作成日',
    },
  ],
}
