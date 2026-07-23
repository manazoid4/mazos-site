import type { MetadataRoute } from 'next';

const baseUrl = 'https://mazos-site.vercel.app';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-07-23'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
