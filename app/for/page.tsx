import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import { Breadcrumbs } from '../breadcrumbs';
import { OG_IMAGE } from '../seo';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { NICHE_GUIDES } from './niches';
import { BRAND_KIT } from '../offers';

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
              <span className="mw-hub-name">{guide.shortName}</span>
              <strong>{guide.title}</strong>
            </a>
          </li>
        ))}
      </ul>

      <section className="mw-resource-cta" aria-labelledby="for-cta-title">
        <div>
          <p className="eyebrow">Not listed?</p>
          <h2 id="for-cta-title">It works for any business customers book, call or enquire with.</h2>
          <p>Tell me the job that eats your week. I’ll send a plan and a fixed price.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href="/leak-check?src=for-hub">Get a free plan and price</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
