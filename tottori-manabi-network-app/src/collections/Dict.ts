import type { CollectionConfig } from 'payload'

export const Dict: CollectionConfig = {
  slug: 'dict',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '基本情報',
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
              // 種別
              name: 'types',
              type: 'select',
              label: '種別',
              options: ['フリースクール', '適応指導教室'],
              required: true,
            },
            {
              // 名前
              name: 'name',
              type: 'text',
              required: true,
              label: '名前',
            },
            {
              // 運営組織
              name: 'org',
              type: 'text',
              required: true,
              label: '運営組織',
            },
            {
              // 住所
              name: 'address',
              type: 'text',
              required: true,
              label: '住所',
            },
            {
              // アイキャッチ（短）
              name: 'slogan-short',
              type: 'text',
              required: true,
              label: 'アイキャッチ（短）',
            },
            {
              // アイキャッチ（長）
              name: 'slogan-long',
              type: 'textarea',
              required: true,
              label: 'アイキャッチ（長）',
            },
            {
              // タグ
              name: 'tags',
              type: 'relationship',
              required: true,
              label: 'タグ',
              hasMany: true,
              relationTo: 'dictTags',
            },
            {
              // ターゲット
              name: 'targets',
              type: 'select',
              required: true,
              label: 'ターゲット',
              hasMany: true,
              options: ['小学生', '中学生', '高校生', '不登校', '夜間制'],
            },
            {
              // 送迎
              name: 'transport',
              type: 'text',
              required: true,
              label: '送迎',
            },
            {
              // 給食
              name: 'lunch',
              type: 'text',
              required: true,
              label: '給食',
            },
            {
              // 学費
              name: 'tuition',
              type: 'text',
              required: true,
              label: '学費',
            },
            {
              // 認定
              name: 'recognition',
              type: 'textarea',
              required: true,
              label: '認定',
            },
            {
              // サムネイル
              name: 'thumbnail',
              type: 'upload',
              required: true,
              label: 'サムネイル',
              relationTo: 'media',
            },
          ],
        },
        {
          label: '詳細情報',
          fields: [
            {
              // 代表者氏名
              name: 'chair',
              type: 'text',
              required: true,
              label: '代表者氏名',
            },
            {
              // ギャラリー
              name: 'gallery',
              type: 'upload',
              required: true,
              label: 'ギャラリー',
              relationTo: 'media',
            },
            {
              // 引用
              name: 'citation',
              type: 'textarea',
              required: true,
              label: '引用',
            },
            {
              // キーワード
              name: 'keywords',
              type: 'array',
              required: true,
              label: 'キーワード',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                },
              ],
            },
            {
              // ポイント
              name: 'point',
              type: 'richText',
              required: true,
              label: 'ポイント',
            },
            {
              // 本文
              name: 'main',
              type: 'richText',
              required: true,
              label: '本文',
            },
            {
              // 時間割
              name: 'schedule',
              type: 'richText',
              required: true,
              label: '時間割',
            },
            {
              // 費用
              name: 'costs',
              type: 'richText',
              required: true,
              label: '費用',
            },
            {
              // 行事
              name: 'events',
              type: 'richText',
              required: true,
              label: '行事',
            },
            {
              // 定員
              name: 'capacity',
              type: 'number',
              required: true,
              label: '定員',
            },
            {
              // 設立年月日
              name: 'date-launch',
              type: 'date',
              required: true,
              label: '設立年月日',
            },
            {
              // 認定年月日
              name: 'date-recognized',
              type: 'date',
              label: '認定年月日（認定済の場合）',
            },
            {
              // 座標
              name: 'location',
              type: 'point',
              required: true,
              label: '座標',
            },
            {
              // Link
              name: 'link',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
      ],
    },
  ],
  upload: true,
}