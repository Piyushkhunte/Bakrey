import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.yourbakerydomain.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}