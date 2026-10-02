import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import { Breadcrumbs } from '../breadcrumbs';
import { OG_IMAGE } from '../seo';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { NICHE_GUIDES } from './niches';
import { OFFERS } from '../offers';
import { CUSTOMER_TYPES } from '../customer-types';
import { KitIcon, NICHE_ICONS } from '../brand-kit/kit-icon';

export const metadata: Metadata = {
  title: 'Who it’s for: pick your business',
  description: fitDescription(`Trades, appointments, creators or offices: pick yours and see your problems, the fix and the price. Named recipes from ${OFFERS[0].price}, plus guides by trade.`),
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
        <h1 id="for-title">What do you run?</h1>
        <p>Pick the one that sounds like you. Each page shows your problems, the step that fixes each one, and the price.</p>
      </section>

      <ul className="mw-hub mw-hub-types" aria-label="Kinds of business">
        {CUSTOMER_TYPES.map((type) => (
          <li key={type.id}>
            <a href={`/for/${type.id}`}>
              <span className="mw-hub-icon"><KitIcon name={type.icon} /></span>
              <span className="mw-hub-name">{type.name}</span>
              <strong>{type.title}</strong>
              <span className="mw-hub-examples">{type.examples}</span>
            </a>
          </li>
        ))}
      </ul>

      <h2 className="for-sub">Or go straight to your trade</h2>
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

      <a className="for-else" href="/free-plan?src=for-hub&trade=other#leak-check-form"><span className="mw-hub-icon"><KitIcon name="spark" /></span><span><strong>Something else?</strong> Every kind of business is welcome. Tell me what you do.</span></a>

      <SiteFooter />
    </main>
  );
}
