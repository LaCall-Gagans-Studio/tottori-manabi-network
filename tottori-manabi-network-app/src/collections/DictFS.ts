import type { CollectionConfig } from 'payload'

export const DictFS: CollectionConfig = {
  slug: 'dictFS',
  access: {
    read: () => true,
  },
  fields: [

    // 基本情報
    { // 公開状況
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    { // 名前
      name: 'name',
      type: 'text',
      required: true,
    },
    { // 運営組織
      name: 'org',
      type: 'text',
      required: true,
    },
    { // 住所
      name: 'address',
      type: 'text',
      required: true,
    },
    { // アイキャッチ（短）
      name: 'slogan-short',
      type: 'text',
      required: true,
    },
    { // アイキャッチ（長）
      name: 'slogan-long',
      type: 'textarea',
      required: true,
    },
    { // タグ
      name: 'tags',
      type: 'select',
      required: true,
      hasMany: true,
      options: ['小学生', '中学生', '高校生', '不登校', '夜間制'],
    },
    { // ターゲット
      name: 'targets',
      type: 'select',
      required: true,
      hasMany: true,
      options: ['小学生', '中学生', '高校生', '不登校', '夜間制'],
    },
    { // 送迎
      name: 'transport',
      type: 'text',
      required: true,
    },
    { // 給食
      name: 'lunch',
      type: 'text',
      required: true,
    },
    { // 学費
      name: 'tuition',
      type: 'text',
      required: true,
    },
    { // 認定
      name: 'recognition',
      type: 'textarea',
      required: true,
    },

    //詳細情報
    { // 代表者氏名
      name: 'chair',
      type: 'text',
      required: true,
    },
    { // 引用
      name: 'citation',
      type: 'textarea',
      required: true,
    },
    { // キーワード
      name: 'keywords',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    { // ポイント
      name: 'point',
      type: 'textarea',
      required: true,
    },
    { // 本文
      name: 'main',
      type: 'richText',
      required: true,
    },
    { // 時間割
      name: 'schedule',
      type: 'textarea',
      required: true,
    },
    { // 費用
      name: 'costs',
      type: 'textarea',
      required: true,
    },
    { // 行事
      name: 'events',
      type: 'textarea',
      required: true,
    },
    { // 定員
      name: 'capacity',
      type: 'number',
      required: true,
    },
    { // 設立年月日
      name: 'date-launch',
      type: 'date',
      required: true,
    },
    { // 認定年月日
      name: 'date-recognized',
      type: 'date',
    },
    { // 座標
      name: 'location',
      type: 'text',
      required: true,
    },
    { // URL
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
