import { StickyCheckCta } from '../sticky-cta';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { BOOKING_URL, CHECK_REPLY_TIME, SITE_URL } from '../site';
import { OG_IMAGE, priceNumber } from '../seo';
import { CallLink, PricingViewTracker } from '../analytics';
import { CARE_PLAN, EXTRAS, FREE_STEP, OFFERS } from '../offers';
import { PriceList } from '../price-list';

const PAGE_URL = `${SITE_URL}/prices`;

const [STARTER, SYSTEM, CUSTOM] = OFFERS;
const CHEAPEST_EXTRA = `£${Math.min(...EXTRAS.map((extra) => Number(extra.price.replace(/[^\d.]/g, ''))))}`;
const lower = (price: string) => price.replace(/^From/, 'from');

export const metadata: Metadata = {
  title: { absolute: `Prices from ${STARTER.price}, add-ons from ${CHEAPEST_EXTRA} | Maz Works` },
  description: `${STARTER.name} ${STARTER.price}, ${SYSTEM.name} ${lower(SYSTEM.price)}, ${CUSTOM.name} ${lower(CUSTOM.price)}, add-ons from ${CHEAPEST_EXTRA} and ${CARE_PLAN.name} ${CARE_PLAN.price}. No VAT added.`,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Maz Works prices', description: `Automation from ${STARTER.price}. Add-ons from ${CHEAPEST_EXTRA}. Fixed quote first, no VAT added.`, url: PAGE_URL, type: 'website', images: [OG_IMAGE] },
};

/** One Service per package, prices read from offers.ts (brief 03). No ratings, phone or street address. */
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': OFFERS.map((offer) => ({
    '@type': 'Service',
    name: offer.name,
    description: offer.body,
    serviceType: 'Business automation',
    provider: { '@id': `${SITE_URL}/#maz-works` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    offers: {
      '@type': 'Offer',
      url: PAGE_URL,
      priceCurrency: 'GBP',
      ...(offer.price.startsWith('From')
        ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: priceNumber(offer.price), priceCurrency: 'GBP' } }
        : { price: priceNumber(offer.price) }),
    },
  })),
};

export default function PricesPage() {
  return (
    <main className="s-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, '\\u003c') }} />
      <SiteHeader />
      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="prices-title">
        <p className="eyebrow">Prices</p>
        <h1 id="prices-title">Every price, in one place.</h1>
        <p className="s-lede">Fixed prices, agreed before any work starts. No VAT added. Not sure what you need? The {FREE_STEP.short} tells you, within {CHECK_REPLY_TIME}.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="/leak-check?src=prices#leak-check-form">Get a free plan and price</a>
          <CallLink href={BOOKING_URL} placement="prices">Or book a 15-minute call</CallLink>
        </div>
      </section>

      <section className="s-section" id="pricing" aria-labelledby="prices-list-title">
        <PricingViewTracker targetId="pricing" />
        <h2 id="prices-list-title" className="s-visually-hidden">Packages, add-ons and terms</h2>
        <PriceList checkHref="/leak-check?src=prices-package" />
        <div className="s-actions">
          <a className="button button-signal" href="/leak-check?src=prices#leak-check-form">Get a free plan and price</a>
        </div>
      </section>
      <SiteFooter />
      <StickyCheckCta href="/leak-check?src=prices-sticky#leak-check-form" />
    </main>
  );
}
