import type { MetadataRoute } from 'next';
import { CASE_STUDY_PROJECTS } from './projects';
import { NICHE_GUIDES } from './for/niches';
import { SITE_URL } from './site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date('2026-09-21');
  return [
    { url: `${SITE_URL}/what-we-do`, lastModified: new Date('2026-09-30'), changeFrequency: 'monthly', priority: 0.95 },
    { url: SITE_URL, lastModified: new Date('2026-09-28'), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/leak-check`, lastModified: new Date('2026-09-27'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/prices`, lastModified: new Date('2026-09-28'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date('2026-09-27'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/lab`, lastModified: new Date('2026-09-27'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/demos`, lastModified: updated, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/3d-printing`, lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/brand-kit`, lastModified: new Date('2026-09-30'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/for`, lastModified: new Date('2026-09-27'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/site-map`, lastModified: new Date('2026-09-27'), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/whats-new`, lastModified: new Date('2026-09-27'), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${SITE_URL}/faq`, lastModified: updated, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/rotareason`, lastModified: updated, changeFrequency: 'monthly', priority: 0.7 },
    ...NICHE_GUIDES.map((guide) => ({
      url: `${SITE_URL}/for/${guide.id}`,
      lastModified: new Date('2026-09-26'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...CASE_STUDY_PROJECTS.map((project) => ({
      url: `${SITE_URL}/work/${project.id}`,
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
