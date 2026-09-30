import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { DemoPath } from '../demo-path';
import { fitDescription, OG_IMAGE } from '../seo';
import { BRAND_KIT, BRAND_KIT_EXTRAS } from '../offers';
import { KitIcon } from './kit-icon';
import './brand-kit.css';

/**
 * Brand Kit (Maz, 30 Sep): for people who sell through social media. Plain
 * words, no jargon, bright icons so it feels different from the systems pages.
 * Never name a researched lead here: this repo is public.
 */
export const metadata: Metadata = {
  title: 'Brand Kit for creators, coaches and makers',
  description: fitDescription(`Your look sorted, your own website and a social profile that sells. ${BRAND_KIT.price}, fixed price, for trainers, makers, bakers, stylists and artists.`),
  alternates: { canonical: '/brand-kit' },
  openGraph: { title: 'Brand Kit — Maz Works', url: '/brand-kit', images: [OG_IMAGE] },
};

const ASK = `/leak-check?package=${encodeURIComponent(BRAND_KIT.name)}&src=brand-kit#leak-check-form`;

export default function BrandKitPage() {
  return (
    <main className="s-home bk">
      <SiteHeader />

      <section className="s-hero bk-hero" id="main-content" tabIndex={-1} aria-labelledby="bk-title">
        <p className="eyebrow">Brand Kit · for creators, coaches and makers</p>
        <h1 id="bk-title">You’re great at what you do. <em>Now look it, and sell it.</em></h1>
        <p className="s-lede">{BRAND_KIT.body}</p>
        <div className="bk-cta">
          <a className="button button-signal s-button-lg" href={ASK}>{`Get my Brand Kit · ${BRAND_KIT.price}`}</a>
          <p className="s-small">Fixed price, agreed before we start.</p>
        </div>
        <ul className="bk-who" aria-label="Made for">
          {BRAND_KIT.forWho.slice(0, 6).map((who, i) => (
            <li key={who.label} data-tone={i % 6}><KitIcon name={who.icon} /><span>{who.label}</span></li>
          ))}
        </ul>
      </section>

      <section className="s-section" aria-labelledby="bk-in-title">
        <p className="eyebrow">What’s in the kit</p>
        <h2 id="bk-in-title">{`Six things, one price: ${BRAND_KIT.price}.`}</h2>
        <ul className="bk-grid">
          {BRAND_KIT.includes.map((item, i) => (
            <li key={item.title} data-tone={i % 6}>
              <span className="bk-badge"><KitIcon name={item.icon} /></span>
              <strong>{item.title}</strong>
              <p>{item.what}</p>
            </li>
          ))}
        </ul>
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
              <a href={`/leak-check?package=${encodeURIComponent(extra.name)}&src=brand-kit#leak-check-form`}>Add this</a>
            </li>
          ))}
        </ul>
        <p className="s-small">Booking, reviews and rebooking are on the <a href="/prices">prices page</a>. Need a full shop, member area or app? That’s <a href="/prices">Custom Software &amp; Websites</a>.</p>
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
