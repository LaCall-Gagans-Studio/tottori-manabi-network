import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'ユーザー｜編集注意',
    plural: 'ユーザー｜編集注意',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
