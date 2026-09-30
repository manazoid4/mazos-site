import { StickyCheckCta } from '../../sticky-cta';
import { OG_IMAGE, fitDescription, priceNumber } from '../../seo';
import { SITE_URL } from '../../site';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../breadcrumbs';
import { SiteFooter, SiteHeader } from '../../site-chrome';
import { NICHE_GUIDES, getNicheGuide } from '../niches';
import { OFFERS } from '../../offers';

export const dynamicParams = false;

export function generateStaticParams() {
  return NICHE_GUIDES.map((guide) => ({ niche: guide.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params;
  const guide = getNicheGuide(niche);
  if (!guide) return {};
  return {
    title: `${guide.shortName}: automation from ${OFFERS[0].price}`,
    description: fitDescription(`${guide.lede} Real examples, a self-check and fixed prices.`),
    alternates: { canonical: `/for/${guide.id}` },
    openGraph: { title: `${guide.title} — Maz Works`, description: guide.lede, url: `/for/${guide.id}`, images: [OG_IMAGE] },
  };
}

export default async function NichePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const guide = getNicheGuide(niche);
  if (!guide) notFound();
  const checkHref = `/leak-check?src=for-${guide.id}&trade=${guide.id}#leak-check-form`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Automation for ${guide.name.toLowerCase()}`,
    serviceType: guide.name,
    description: guide.lede,
    url: `${SITE_URL}/for/${guide.id}`,
    provider: { '@id': `${SITE_URL}/#maz-works` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    offers: { '@type': 'Offer', name: OFFERS[0].name, price: priceNumber(OFFERS[0].price), priceCurrency: 'GBP' },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="niche-title">
        <Breadcrumbs items={[{ href: '/for', label: 'Who it’s for' }, { label: guide.shortName }]} />
        <p className="eyebrow">{guide.name}</p>
        <h1 id="niche-title">{guide.title}.</h1>
        <p>{guide.lede}</p>
        <div className="mw-actions">
          <a className="button button-signal" href={checkHref}>Get a free plan and price</a>
        </div>
        <p className="mw-hero-note">Free · no call required · I plan it myself</p>
        <p className="mw-hero-note">Not your trade? The same approach works for any business customers book, call or enquire with.</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="niche-examples-title">
        <p className="eyebrow">Real examples</p>
        <h2 id="niche-examples-title">Where customers slip away.</h2>
        <p className="mw-qw-lead">Real things I found looking at UK businesses in September 2026. Names left out on purpose.</p>
        <ul className="mw-qw-list">
          {guide.examples.map((example) => (
            <li key={example.found}><strong>{example.found}</strong> {example.cost}</li>
          ))}
        </ul>
      </section>

      <section className="mw-qw-section" aria-labelledby="niche-self-check-title">
        <p className="eyebrow">Check yours in 60 seconds</p>
        <h2 id="niche-self-check-title">Three quick tests on your phone.</h2>
        <ol className="mw-qw-list">
          {guide.selfCheck.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="mw-qw-section" aria-labelledby="niche-fix-title">
        <p className="eyebrow">What I’d set up, and the price</p>
        <h2 id="niche-fix-title">Fixed prices, agreed first.</h2>
        <ul className="mw-qw-list">
          {guide.fixes.map((fix) => (
            <li key={fix.name}><strong>{fix.name}, {fix.price}.</strong> {fix.body} <a href={`/leak-check?src=for-${guide.id}&package=${encodeURIComponent(fix.pick)}&trade=${guide.id}#leak-check-form`}>Get a free plan and price →</a></li>
          ))}
        </ul>
        <p className="mw-qw-lead">You own everything I build. <a href="/prices">See all prices</a>.</p>
      </section>

      {guide.visuals ? (
        <section className="mw-qw-section" aria-labelledby="niche-visuals-title">
          <p className="eyebrow">What it can look like</p>
          <h2 id="niche-visuals-title">{guide.id === 'architects' ? 'Drawings and models, linked to the project.' : 'A look at the job running itself.'}</h2>
          <div className="mw-figures">
            {guide.visuals.map((visual) => (
              <figure key={visual.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={visual.src} alt={visual.alt} width={800} height={560} loading="lazy" />
                <figcaption>{visual.caption}</figcaption>
              </figure>
            ))}
          </div>
          <a className="button button-signal" href={checkHref}>Get a free plan and price</a>
        </section>
      ) : null}

      {guide.related ? (
        <p className="mw-related"><a href={guide.related.href}><strong>{guide.related.label} →</strong> <span>{guide.related.body}</span></a></p>
      ) : null}

      <p className="mw-related mw-related-quiet"><a href="/for"><strong>Other trades →</strong> <span>Salons, groomers, garages, cafés, clinics and architects.</span></a></p>

      <section className="mw-resource-cta" aria-labelledby="niche-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="niche-cta-title">Not sure where to start?</h2>
          <p>Tell me the job. I&apos;ll send a plan and a fixed price.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={checkHref}>Get a free plan and price</a>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href={checkHref} />
    </main>
  );
}
