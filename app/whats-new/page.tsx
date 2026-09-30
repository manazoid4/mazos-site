import { OG_IMAGE } from '../seo';
import type { Metadata } from 'next';
import { Breadcrumbs } from '../breadcrumbs';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL } from '../site';
import { OFFERS } from '../offers';

const PAGE_URL = `${SITE_URL}/whats-new`;

// Brief 06: written for buyers. Each entry is something an owner can use today,
// with a link to it. No internal tooling, tests or refactors, and no results.
const SHIPPED = [
  { title: 'See each system working', href: '/#how', body: 'Short animations show what happens after a missed call, a booking, a finished job or a quote, in a normal working day.' },
  { title: 'A free plan in a few taps', href: '/leak-check', body: 'Tap what’s costing you, add your name and email, and I reply with a plan and a fixed price. Typing is optional.' },
  { title: 'A guide for your trade', href: '/for', body: 'Salons, groomers, garages, cafés, clinics and architects each have a page with real examples and pictures of the systems.' },
  { title: 'Every price in one place', href: '/prices', body: `Packages from ${OFFERS[0].price}, every add-on with a plain line on what you get, and what isn’t included.` },
  { title: 'Easier to find your way around', href: '/site-map', body: 'The same menu on every page, a site map, and a free plan button that stays one tap away on phones.' },
];

export const metadata: Metadata = {
  title: 'What I’ve shipped lately',
  description: 'New things on Maz Works you can use today: the free plan, trade guides, prices in one place and short animations of each system.',
  alternates: { canonical: PAGE_URL },
  openGraph: { images: [OG_IMAGE], title: 'What I’ve shipped lately — Maz Works', description: 'New things on Maz Works you can use today.', url: PAGE_URL, type: 'website' },
};

export default function WhatsNewPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'What I’ve shipped lately',
    url: PAGE_URL,
    itemListElement: SHIPPED.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: `${SITE_URL}${item.href}` })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <SiteHeader />
      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="updates-title">
        <Breadcrumbs items={[{ label: 'What’s new' }]} />
        <p className="eyebrow">Updated September 2026</p>
        <h1 id="updates-title">What I’ve shipped lately.</h1>
        <p>New things on the site you can use today. Each one links straight to it.</p>
      </section>
      <section className="mw-qw-section" aria-label="Recently shipped">
        <ul className="s-why-list">
          {SHIPPED.map((item) => (
            <li key={item.title}>
              <strong><a href={item.href}>{item.title}</a></strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
        <div className="mw-actions">
          <a className="button button-signal" href="/leak-check?src=whats-new#leak-check-form">Get a free plan and price</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
