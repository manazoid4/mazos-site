import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import { Breadcrumbs } from '../breadcrumbs';
import { OG_IMAGE } from '../seo';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { NICHE_GUIDES } from './niches';
import { BRAND_KIT } from '../offers';
import { KitIcon, NICHE_ICONS } from '../brand-kit/kit-icon';

export const metadata: Metadata = {
  title: 'Who it’s for: guides by trade',
  description: fitDescription('Short guides for salons, dog groomers, garages, cafés, clinics and architects: where customers slip away, a 60-second self-check, and what I’d set up.'),
  alternates: { canonical: '/for' },
  openGraph: { title: 'Who it’s for — Maz Works', url: '/for', images: [OG_IMAGE] },
};

export default function ForHubPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="for-title">
        <Breadcrumbs items={[{ label: 'Who it’s for' }]} />
        <p className="eyebrow">Who it’s for</p>
        <h1 id="for-title">Who are you?</h1>
        <p>Pick the one that sounds like you.</p>
      </section>

      <a className="for-creators" href="/brand-kit">
        <span className="for-creators-icons" aria-hidden="true"><KitIcon name="dumbbell" /><KitIcon name="camera" /><KitIcon name="brush" /></span>
        <span className="for-creators-tag">Trainers, coaches, makers, stylists, artists</span>
        <strong>I sell through social media</strong>
        <span>{`Brand Kit · ${BRAND_KIT.price}: your look, your own website, a profile that sells.`}</span>
        <span className="mw-hub-go">See the Brand Kit →</span>
      </a>

      <h2 className="for-sub">I run a business customers book or call</h2>
      <ul className="mw-hub">
        {NICHE_GUIDES.map((guide) => (
          <li key={guide.id}>
            <a href={`/for/${guide.id}`}>
              <span className="mw-hub-icon"><KitIcon name={NICHE_ICONS[guide.id] ?? 'spark'} /></span>
              <span className="mw-hub-name">{guide.shortName}</span>
              <strong>{guide.title}</strong>
            </a>
          </li>
        ))}
      </ul>

      <a className="for-else" href="/leak-check?src=for-hub&trade=other#leak-check-form"><span className="mw-hub-icon"><KitIcon name="spark" /></span><span><strong>Something else?</strong> Every kind of business is welcome. Tell me what you do.</span></a>

      <SiteFooter />
    </main>
  );
}
