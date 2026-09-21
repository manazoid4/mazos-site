import type { MetadataRoute } from 'next';
import { CASE_STUDY_PROJECTS } from './projects';
import { SITE_URL } from './site';
import { LATEST_MAZ_WORKS_UPDATE } from './updates';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date('2026-09-21');
  return [
    { url: SITE_URL, lastModified: updated, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/demos`, lastModified: updated, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/3d-printing`, lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/faq`, lastModified: updated, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/whats-new`, lastModified: new Date(LATEST_MAZ_WORKS_UPDATE.publishedAt), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/rotareason`, lastModified: updated, changeFrequency: 'monthly', priority: 0.7 },
    ...CASE_STUDY_PROJECTS.map((project) => ({
      url: `${SITE_URL}/work/${project.id}`,
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
