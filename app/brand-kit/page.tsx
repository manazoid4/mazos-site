import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { DemoPath } from '../demo-path';
import { fitDescription, OG_IMAGE } from '../seo';
import { CREATOR_EXTRAS, CREATOR_JOURNEY, CREATOR_OFFERS, UPGRADE_CREDITS } from '../offers';
import { OfferCard } from '../price-list';
import { KitIcon } from './kit-icon';
import './brand-kit.css';
import { CampaignLink } from '../campaign-link';

/**
 * Creators page (Offer v11, 2 Oct). Two steps instead of three overlapping
 * products: Creator Starter (a list you own) and Creator Launch (a page that
 * sells, in your look). Plain words, bright icons. Never name a researched
 * lead here: this repo is public.
 */
const [STARTER, LAUNCH] = CREATOR_OFFERS;

const WHO: { icon: string; label: string }[] = [
  { icon: 'dumbbell', label: 'Personal trainers' },
  { icon: 'bolt', label: 'Coaches' },
  { icon: 'gift', label: 'Makers and Etsy sellers' },
  { icon: 'scissors', label: 'Hair, nails and beauty' },
  { icon: 'camera', label: 'Photographers' },
  { icon: 'music', label: 'Musicians and DJs' },
];

export const metadata: Metadata = {
  title: 'For creators, coaches and makers',
  description: fitDescription(`Turn followers into a list you own and a page that sells. ${STARTER.name} ${STARTER.price}, ${LAUNCH.name} ${LAUNCH.price}. Done for you, owned by you, fixed prices agreed first.`),
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
        <p className="s-lede">Your content earns trust. I build the path from a post to a paid session or resource, with every buyer added to an email list you own. Done for you, instead of renting a link-in-bio app.</p>
        <div className="bk-cta">
          <CampaignLink className="button button-signal s-button-lg" href={ask(STARTER.name)}>{`Get my free plan · start from ${STARTER.price}`}</CampaignLink>
          <p className="s-small">{`${STARTER.name} ${STARTER.price} · ${LAUNCH.name} ${LAUNCH.price}. Fixed price, agreed before we start.`}</p>
        </div>
        <ul className="bk-who" aria-label="Made for">
          {WHO.map((who, i) => (
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
        <p className="eyebrow">Two steps</p>
        <h2 id="bk-options-title">Own your list, then sell from one page.</h2>
        <div className="s-prices">
          {CREATOR_OFFERS.map((offer) => <OfferCard offer={offer} checkHref="/free-plan" key={offer.id} />)}
        </div>
        <p className="s-small">{UPGRADE_CREDITS[1]}</p>
      </section>

      <section className="s-section" aria-labelledby="bk-grow-title">
        <p className="eyebrow">When you’re ready to grow</p>
        <h2 id="bk-grow-title">Add what brings in more sales.</h2>
        <p className="s-lede">Each one is a job from the automation menu, added to your package.</p>
        <ul className="bk-grid bk-extras">
          {CREATOR_EXTRAS.map((extra, i) => (
            <li key={extra.name} data-tone={(i + 2) % 6}>
              <span className="bk-badge"><KitIcon name={extra.icon} /></span>
              <strong>{extra.name} <span className="bk-price">{extra.price}</span></strong>
              <p>{extra.what}</p>
              <CampaignLink href={ask(extra.name)}>Add this</CampaignLink>
            </li>
          ))}
        </ul>
        <p className="s-small">Need a full shop, member area or app? That’s <a href="/prices#systems">Custom Software</a>.</p>
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
