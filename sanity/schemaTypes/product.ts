import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),

    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
    },
    prepare({ title, media, price }) {
      return {
        title,
        media,
        subtitle: price !== undefined ? `₹${price}` : 'No price',
      }
    },
  },
})