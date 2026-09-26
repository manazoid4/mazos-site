import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '../../site-chrome';
import { NICHE_GUIDES, getNicheGuide } from '../niches';

export const dynamicParams = false;

export function generateStaticParams() {
  return NICHE_GUIDES.map((guide) => ({ niche: guide.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params;
  const guide = getNicheGuide(niche);
  if (!guide) return {};
  return {
    title: guide.title,
    description: `${guide.lede} Real examples, a 60-second self-check and fixed prices.`,
    alternates: { canonical: `/for/${guide.id}` },
    openGraph: { title: `${guide.title} — Maz Works`, description: guide.lede, url: `/for/${guide.id}` },
  };
}

export default async function NichePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const guide = getNicheGuide(niche);
  if (!guide) notFound();
  const checkHref = `/leak-check?src=for-${guide.id}`;

  return (
    <main>
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="niche-title">
        <p className="eyebrow">{guide.name}</p>
        <h1 id="niche-title">{guide.title}.</h1>
        <p>{guide.lede}</p>
        <div className="mw-actions">
          <a className="button button-signal" href={checkHref}>Get a free Leak Check</a>
        </div>
        <p className="mw-hero-note">Free · no call required · I check it myself</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="niche-examples-title">
        <p className="eyebrow">Real examples</p>
        <h2 id="niche-examples-title">What I found this month.</h2>
        <p className="mw-qw-lead">All real, all on live UK small business websites. Names left out on purpose.</p>
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
        <p className="eyebrow">What fixing it costs</p>
        <h2 id="niche-fix-title">Fixed prices, agreed first.</h2>
        <ul className="mw-qw-list">
          {guide.fixes.map((fix) => (
            <li key={fix.name}><strong>{fix.name}, {fix.price}.</strong> {fix.body}</li>
          ))}
        </ul>
        <p className="mw-qw-lead">You own everything I build. <a href="/#pricing">See all prices</a>.</p>
      </section>

      <section className="mw-resource-cta" aria-labelledby="niche-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="niche-cta-title">Not sure what yours is leaking?</h2>
          <p>Send your link. I&apos;ll check it myself and send a short, plain list.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={checkHref}>Get the free check</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
