import type { CollectionConfig } from 'payload'

export const DictTargets: CollectionConfig = {
  slug: 'dictTargets',
  labels: {
    singular: '施設ターゲット',
    plural: '施設ターゲット',
  },
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
