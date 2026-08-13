import type { MetadataRoute } from 'next';
import { CASE_STUDY_PROJECTS } from './projects';
import { SITE_URL } from './site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date('2026-08-13');
  return [
    { url: SITE_URL, lastModified: updated, changeFrequency: 'monthly', priority: 1 },
    ...CASE_STUDY_PROJECTS.map((project) => ({
      url: `${SITE_URL}/work/${project.id}`,
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}