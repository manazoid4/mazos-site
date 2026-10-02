import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { fitDescription, OG_IMAGE } from '../seo';
import { CREATOR_OFFERS } from '../offers';

/**
 * The creators page moved to /for/creators (site by customer type, 2 Oct).
 * This stub keeps old links and posts working: noindex, canonical to the new
 * page, a meta refresh for people and a plain link for everyone else.
 */
const [STARTER, LAUNCH] = CREATOR_OFFERS;

export const metadata: Metadata = {
  title: 'For creators has moved',
  description: fitDescription(`The creators page is now at /for/creators: ${STARTER.name} ${STARTER.price}, ${LAUNCH.name} ${LAUNCH.price}.`),
  alternates: { canonical: '/for/creators' },
  robots: { index: false, follow: true },
  openGraph: { title: 'For creators — Maz Works', url: '/for/creators', images: [OG_IMAGE] },
};

export default function BrandKitMovedPage() {
  return (
    <main className="s-home">
      <meta httpEquiv="refresh" content="0; url=/for/creators" />
      <SiteHeader />
      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="bk-moved-title">
        <p className="eyebrow">This page has moved</p>
        <h1 id="bk-moved-title">Creators, coaches and makers now have their own page.</h1>
        <p className="s-lede">{`${STARTER.name} ${STARTER.price} and ${LAUNCH.name} ${LAUNCH.price}, with your problems, the fix and the price on one page.`}</p>
        <div className="s-actions"><a className="button button-signal s-button-lg" href="/for/creators">Go to the creators page</a></div>
      </section>
      <SiteFooter />
    </main>
  );
}
