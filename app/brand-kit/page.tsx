import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { DemoPath } from '../demo-path';
import { fitDescription, OG_IMAGE } from '../seo';
import { BRAND_KIT, BRAND_KIT_EXTRAS, BRAND_OFFERS, CREATOR_JOURNEY, UPGRADE_CREDITS, getOffer } from '../offers';
import { OfferCard } from '../price-list';
import { KitIcon } from './kit-icon';
import './brand-kit.css';
import { CampaignLink } from '../campaign-link';

/**
 * Creators page (Offer v10, 2 Oct). Brand work and sales-page work are
 * separate products: the kit is how you look and sound, the Sales Page is
 * where followers book or buy, and the bundle is both, built to match.
 * Plain words, bright icons. Never name a researched lead here: this repo is public.
 */
const SALES_PAGE = getOffer('sales-page');
const BUNDLE = getOffer('brand-sales-page');

export const metadata: Metadata = {
  title: 'For creators, coaches and makers',
  description: fitDescription(`Turn followers into bookings, buyers and email subscribers. ${BRAND_KIT.name} ${BRAND_KIT.price}, ${SALES_PAGE.name} ${SALES_PAGE.price}, or both for ${BUNDLE.price}. Fixed prices agreed first.`),
  alternates: { canonical: '/brand-kit' },
  openGraph: { title: 'For creators — Maz Works', url: '/brand-kit', images: [OG_IMAGE] },
};

const ask = (name: string) => `/free-plan?package=${encodeURIComponent(name)}&src=brand-kit#leak-check-form`;

export default function BrandKitPage() {
  return (
    <main className="s-home bk">
      <SiteHeader />

      <section className="s-hero bk-hero" id="main-content" tabIndex={-1} aria-labelledby="bk-title">
        <p className="eyebrow">For creators, coaches and makers</p>
        <h1 id="bk-title">You’ve got followers. <em>Now turn them into bookings and sales.</em></h1>
        <p className="s-lede">Your content earns trust. I build the path from a post to a paid session or resource, with every buyer added to an email list you own.</p>
        <div className="bk-cta">
          <CampaignLink className="button button-signal s-button-lg" href={ask(BUNDLE.name)}>{`Get the ${BUNDLE.name} · ${BUNDLE.price}`}</CampaignLink>
          <p className="s-small">{`Or the ${SALES_PAGE.name} on its own, ${SALES_PAGE.price}. Fixed price, agreed before we start.`}</p>
        </div>
        <ul className="bk-who" aria-label="Made for">
          {BRAND_KIT.forWho.slice(0, 6).map((who, i) => (
            <li key={who.label} data-tone={i % 6}><KitIcon name={who.icon} /><span>{who.label}</span></li>
          ))}
        </ul>
      </section>

      <section className="s-section" aria-labelledby="bk-path-title">
        <p className="eyebrow">How followers become customers</p>
        <h2 id="bk-path-title">Five steps, set up once.</h2>
        <ol className="bk-path">
          {CREATOR_JOURNEY.map((item, i) => (
            <li key={item.step} data-tone={i % 6}><strong>{item.step}</strong><span>{item.what}</span></li>
          ))}
        </ol>
      </section>

      <section className="s-section" aria-labelledby="bk-options-title">
        <p className="eyebrow">Pick what you need</p>
        <h2 id="bk-options-title">Look the part, sell from one page, or both.</h2>
        <div className="s-prices">
          <OfferCard offer={SALES_PAGE} checkHref="/free-plan" />
          {BRAND_OFFERS.map((offer) => <OfferCard offer={offer} checkHref="/free-plan" key={offer.id} />)}
        </div>
        <p className="s-small">{UPGRADE_CREDITS[1]}</p>
      </section>

      <section className="s-section" aria-labelledby="bk-in-title">
        <p className="eyebrow">{`What’s in the ${BRAND_KIT.name}`}</p>
        <h2 id="bk-in-title">{`How you look and sound: ${BRAND_KIT.price}.`}</h2>
        <ul className="bk-grid">
          {BRAND_KIT.includes.map((item, i) => (
            <li key={item.title} data-tone={i % 6}>
              <span className="bk-badge"><KitIcon name={item.icon} /></span>
              <strong>{item.title}</strong>
              <p>{item.what}</p>
            </li>
          ))}
        </ul>
        <p className="s-small">{`The kit is brand only. Booking, payments and your page are the ${SALES_PAGE.name}.`}</p>
      </section>

      <section className="s-section" aria-labelledby="bk-grow-title">
        <p className="eyebrow">When you’re ready to grow</p>
        <h2 id="bk-grow-title">Add what brings in more sales.</h2>
        <p className="s-lede">Set up once, then it runs on its own.</p>
        <ul className="bk-grid bk-extras">
          {BRAND_KIT_EXTRAS.slice(0, 3).map((extra, i) => (
            <li key={extra.name} data-tone={(i + 2) % 6}>
              <span className="bk-badge"><KitIcon name={extra.icon} /></span>
              <strong>{extra.name} <span className="bk-price">{extra.price}</span></strong>
              <p>{extra.what}</p>
              <CampaignLink href={ask(extra.name)}>Add this</CampaignLink>
            </li>
          ))}
        </ul>
        <p className="s-small">Booking, reviews and rebooking are on the <a href="/prices#extras">prices page</a>. Need a full shop, member area or app? That’s <a href="/prices#systems">Custom Software</a>.</p>
      </section>

      <section className="s-section" aria-labelledby="bk-demo-title">
        <p className="eyebrow">See it before you pay</p>
        <h2 id="bk-demo-title">Start with a quick chat.</h2>
        <DemoPath source="brand-kit" compact />
      </section>

      <p className="bk-promise">Fixed price agreed first. No contracts, no VAT added, and you own everything.</p>

      <SiteFooter />
    </main>
  );
}
