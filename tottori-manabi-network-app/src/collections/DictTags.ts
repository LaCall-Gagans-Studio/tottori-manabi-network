import type { CollectionConfig } from 'payload'

export const DictTags: CollectionConfig = {
  slug: 'dictTags',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
