import type { CollectionConfig } from 'payload'

export const Article: CollectionConfig = {
  slug: 'article',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
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
      label: 'アイキャッチ（短）',
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
    // {
    //   // 担当者
    //   name: 'createdBy',
    //   type: 'relationship',
    //   label: '担当者',
    //   hasMany: true,
    //   relationTo: 'articleWriter',
    // },
  ],
}
