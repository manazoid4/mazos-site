import { PersonalPreview } from '../../personal-preview';
import { ServiceSchema } from '../../service-schema';
import { systemsForTrade } from '../../systems';
import { Scenes } from '../../scenes';
import { ScrollReveal } from '../../scroll-reveal';
import { fitDescription } from '../../seo';
import { OG_IMAGE } from '../../seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../breadcrumbs';
import { SiteFooter, SiteHeader } from '../../site-chrome';
import { NICHE_GUIDES, getNicheGuide } from '../niches';
import { KitIcon, NICHE_ICONS } from '../../brand-kit/kit-icon';
import { CUSTOMER_TYPES, getCustomerType } from '../../customer-types';
import { TypePage } from '../type-page';
import { OFFERS } from '../../offers';
import { StraightAnswers } from '../../straight-answers';
import { CalculatorReveal } from '../../calculator-reveal';

export const dynamicParams = false;

/** Four customer-type pages (trades, appointments, creators, offices) plus the trade guides. */
export function generateStaticParams() {
  return [...CUSTOMER_TYPES.map((type) => ({ niche: type.id })), ...NICHE_GUIDES.map((guide) => ({ niche: guide.id }))];
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params;
  const type = getCustomerType(niche);
  if (type) {
    return {
      title: `${type.shortName}: what to set up and the price`,
      description: fitDescription(`${type.lede} Named recipes from ${OFFERS[0].price}, what’s included, and a free plan.`),
      alternates: { canonical: `/for/${type.id}` },
      openGraph: { title: `${type.title} — Maz Works`, description: fitDescription(type.lede), url: `/for/${type.id}`, images: [OG_IMAGE] },
    };
  }
  const guide = getNicheGuide(niche);
  if (!guide) return {};
  return {
    title: `${guide.shortName}: business systems`,
    description: fitDescription(`${guide.lede} What I’d set up and the fixed price.`),
    alternates: { canonical: `/for/${guide.id}` },
    openGraph: { title: `${guide.title} — Maz Works`, description: fitDescription(guide.lede), url: `/for/${guide.id}`, images: [OG_IMAGE] },
  };
}

export default async function NichePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const type = getCustomerType(niche);
  if (type) return <TypePage type={type} />;
  const guide = getNicheGuide(niche);
  if (!guide) notFound();
  const checkHref = `/free-plan?src=for-${guide.id}&trade=${guide.id}`;
  const parent = CUSTOMER_TYPES.find((item) => item.niches.includes(guide.id));

  return (
    <main>
      <SiteHeader /><ServiceSchema path={`/for/${guide.id}`} />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="niche-title">
        <Breadcrumbs items={[{ href: '/for', label: 'Who it’s for' }, ...(parent ? [{ href: `/for/${parent.id}`, label: parent.shortName }] : []), { label: guide.shortName }]} />
        <span className="mw-niche-badge" aria-hidden="true"><KitIcon name={NICHE_ICONS[guide.id] ?? 'spark'} size={56} /></span>
        <p className="eyebrow">{guide.name}</p>
        <h1 id="niche-title">{guide.title}.</h1>
        <p>{guide.lede}</p>
        <div className="mw-actions">
          <a className="button button-signal" href={checkHref}>Get my free plan</a>
        </div>
        <p className="mw-hero-note">{`Free plan, no call needed. Most start with one task at ${OFFERS[0].price}. Manazir plans and builds it himself.`}</p>
      </section>

      <PersonalPreview trade={guide.id} />
      <section className="mw-qw-section" id="day" aria-labelledby="niche-day-title">
        <p className="eyebrow">See it working</p>
        <h2 id="niche-day-title">What changes in your day.</h2>
        <Scenes systems={systemsForTrade(guide.id).slice(0, 1)} />
      </section>

      <section className="mw-qw-section" aria-labelledby="niche-fix-title">
        <p className="eyebrow">What I’d set up, and the price</p>
        <h2 id="niche-fix-title">Fixed prices, agreed first.</h2>
        <ul className="mw-qw-list">
          {guide.fixes.map((fix) => (
            <li key={fix.name} className="mw-example"><strong>{fix.name} · {fix.price}</strong><p className="mw-example-seen">{fix.body}</p><a className="mw-example-fix" href={`/free-plan?src=for-${guide.id}&trade=${guide.id}&package=${encodeURIComponent(fix.pick)}#leak-check-form`}>Get my free plan →</a></li>
          ))}
        </ul>
        <p className="mw-qw-lead"><a className="s-details-link" href="/prices">See the details: every price and what’s included →</a>{parent ? <> <a className="s-details-link" href={`/for/${parent.id}`}>Every fix for {parent.shortName.toLowerCase()} →</a></> : null}</p>
      </section>

      {parent ? (
        <section className="mw-qw-section" id="cost" aria-label="What missed enquiries cost you">
          <CalculatorReveal preset={parent.calculator} trade={guide.id} />
        </section>
      ) : null}

      {guide.visuals ? (
        <section className="mw-qw-section" aria-labelledby="niche-visuals-title">
          <p className="eyebrow">What it can look like</p>
          <h2 id="niche-visuals-title">Drawings and models, linked to the project.</h2>
          <div className="mw-figures">
            {guide.visuals.map((visual) => (
              <figure key={visual.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={visual.src} alt={visual.alt} width={800} height={560} loading="lazy" />
                <figcaption>{visual.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mw-qw-lead">Illustrations made for this page, not client work.</p>
        </section>
      ) : null}

      {guide.related ? (
        <p className="mw-related"><a href={guide.related.href}><strong>{guide.related.label} →</strong> <span>{guide.related.body}</span></a></p>
      ) : null}

      <p className="mw-related mw-related-quiet"><a href="/for"><strong>Other trades →</strong> <span>Heating and plumbing, salons, groomers, garages, cafés, clinics and architects.</span></a></p>

      <StraightAnswers />

      <section className="mw-resource-cta" aria-labelledby="niche-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="niche-cta-title">Not sure where to start?</h2>
          <p>Tell me the job. I&apos;ll send a plan and a fixed price.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={checkHref}>Get my free plan</a>
        </div>
      </section>

      <SiteFooter /><ScrollReveal />
    </main>
  );
}
