import { ServiceSchema } from '../service-schema';
import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { CHECK_REPLY_TIME, SITE_URL } from '../site';
import { OG_IMAGE } from '../seo';
import { PricingViewTracker } from '../analytics';
import { CARE_PLAN, CHANGES_WINDOW, EXTRAS, FREE_STEP, OFFERS, getOffer } from '../offers';
import { PriceList } from '../price-list';
import { ChangesWindow } from '../demo-path';

const PAGE_URL = `${SITE_URL}/prices`;

const [STARTER, SYSTEM, CUSTOM] = OFFERS;
const CHEAPEST_EXTRA = `£${Math.min(...EXTRAS.map((extra) => Number(extra.price.replace(/[^\d.]/g, ''))))}`;
const lower = (price: string) => price.replace(/^From/, 'from');

export const metadata: Metadata = {
  title: { absolute: 'Prices and packages | Maz Works' },
  description: fitDescription(`Every Maz Works price in one place. ${STARTER.name} ${STARTER.price}, ${SYSTEM.name} ${lower(SYSTEM.price)}, ${CUSTOM.name} ${lower(CUSTOM.price)}, ${getOffer('creator-launch').name} ${getOffer('creator-launch').price}, one-day set-ups from ${CHEAPEST_EXTRA} and ${CARE_PLAN.name} ${CARE_PLAN.price}. Fixed quote first, no VAT added.`),
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Maz Works prices', description: fitDescription(`Automation from ${STARTER.price}. One-day set-ups from ${CHEAPEST_EXTRA}. Fixed quote first, no VAT added.`), url: PAGE_URL, type: 'website', images: [OG_IMAGE] },
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
          <a className="button button-signal s-button-lg" href="/free-plan">Get my free plan</a>
          <a className="button" href="/demos">Or see a free demo first</a>
        </div>
      </section>

      <section className="s-section" id="pricing" aria-labelledby="prices-list-title">
        <PricingViewTracker targetId="pricing" />
        <h2 id="prices-list-title" className="s-visually-hidden">Packages, add-ons and terms</h2>
        <PriceList checkHref="/free-plan" />
        <div className="s-actions">
          <a className="button button-signal" href="/free-plan">Get my free plan</a>
        </div>
      </section>
      <section className="s-section" id="changes" aria-labelledby="changes-title">
        <p className="eyebrow">After it goes live</p>
        <h2 id="changes-title">{CHANGES_WINDOW.name}, included.</h2>
        <ChangesWindow />
      </section>
      <SiteFooter />
    </main>
  );
}
