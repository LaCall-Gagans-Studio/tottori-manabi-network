import type { CollectionConfig } from 'payload'

export const DictTags: CollectionConfig = {
  slug: 'dictTags',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
