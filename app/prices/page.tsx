import { ServiceSchema } from '../service-schema';
import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { BOOKING_URL, CHECK_REPLY_TIME, SITE_URL } from '../site';
import { OG_IMAGE } from '../seo';
import { CallLink, PricingViewTracker } from '../analytics';
import { CARE_PLAN, EXTRAS, FREE_STEP, OFFERS } from '../offers';
import { PriceList } from '../price-list';

const PAGE_URL = `${SITE_URL}/prices`;

const [STARTER, SYSTEM, CUSTOM] = OFFERS;
const CHEAPEST_EXTRA = `£${Math.min(...EXTRAS.map((extra) => Number(extra.price.replace(/[^\d.]/g, ''))))}`;
const lower = (price: string) => price.replace(/^From/, 'from');

export const metadata: Metadata = {
  title: { absolute: 'Prices and packages | Maz Works' },
  description: fitDescription(`Every Maz Works price in one place. ${STARTER.name} ${STARTER.price}, ${SYSTEM.name} ${lower(SYSTEM.price)}, ${CUSTOM.name} ${lower(CUSTOM.price)}, add-ons from ${CHEAPEST_EXTRA} and ${CARE_PLAN.name} ${CARE_PLAN.price}. Fixed quote first, no VAT added.`),
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Maz Works prices', description: fitDescription(`Automation from ${STARTER.price}. Add-ons from ${CHEAPEST_EXTRA}. Fixed quote first, no VAT added.`), url: PAGE_URL, type: 'website', images: [OG_IMAGE] },
};

export default function PricesPage() {
  return (
    <main className="s-home">
      <SiteHeader /><ServiceSchema path="/prices" />
      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="prices-title">
        <p className="eyebrow">Prices</p>
        <h1 id="prices-title">Every price, in one place.</h1>
        <p className="s-lede">Fixed prices, agreed before any work starts. No VAT added. Not sure what you need? The {FREE_STEP.short} tells you, within {CHECK_REPLY_TIME}.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="/leak-check">Get a free plan and price</a>
          <CallLink className="button" href={BOOKING_URL} placement="prices">Or book a 15-minute call</CallLink>
        </div>
      </section>

      <section className="s-section" id="pricing" aria-labelledby="prices-list-title">
        <PricingViewTracker targetId="pricing" />
        <h2 id="prices-list-title" className="s-visually-hidden">Packages, add-ons and terms</h2>
        <PriceList checkHref="/leak-check" />
        <div className="s-actions">
          <a className="button button-signal" href="/leak-check">Get a free plan and price</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
