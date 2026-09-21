import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL } from '../site';
import { formatUpdateDate, LATEST_MAZ_WORKS_UPDATE, MAZ_WORKS_UPDATES } from '../updates';

const PAGE_URL = `${SITE_URL}/whats-new`;

export const metadata: Metadata = {
  title: "What's New",
  description: 'Recent Maz Works site and product improvements, explained plainly with what changed and why it matters.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What's New at Maz Works",
    description: 'Recent improvements to Maz Works, explained without release-note noise.',
    url: PAGE_URL,
    type: 'website',
  },
};

export default function WhatsNewPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "What's New at Maz Works",
    url: PAGE_URL,
    dateModified: LATEST_MAZ_WORKS_UPDATE.publishedAt,
    hasPart: MAZ_WORKS_UPDATES.map((update) => ({
      '@type': 'Article',
      headline: update.title,
      datePublished: update.publishedAt,
      url: `${PAGE_URL}#${update.id}`,
      description: update.summary,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="updates-title">
        <p className="eyebrow">Product updates</p>
        <h1 id="updates-title">What&apos;s new at Maz Works.</h1>
        <p>Real changes to the site and customer journey. Short release notes, what changed, and no invented results.</p>
        <div className="mw-actions">
          <a className="button button-signal" href={`#${LATEST_MAZ_WORKS_UPDATE.id}`}>Latest update</a>
          <a className="text-link" href="/#work">See the work <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <div className="mw-updates-layout">
        <nav className="mw-updates-nav" aria-label="Update history">
          <p className="eyebrow">Jump to an update</p>
          <ol>
            {MAZ_WORKS_UPDATES.map((update, index) => (
              <li key={update.id}>
                <a href={`#${update.id}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <time dateTime={update.publishedAt}>{formatUpdateDate(update.publishedAt)}</time>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="mw-update-list" aria-label="Maz Works updates">
          {MAZ_WORKS_UPDATES.map((update, index) => (
            <article className="mw-update-card" id={update.id} key={update.id}>
              <header>
                <div className="mw-update-meta">
                  <span>{index === 0 ? 'LATEST' : 'UPDATE'}</span>
                  <span>{update.label}</span>
                  <time dateTime={update.publishedAt}>{formatUpdateDate(update.publishedAt)}</time>
                </div>
                <h2>{update.title}</h2>
                <p>{update.summary}</p>
              </header>
              <ul>
                {update.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </section>
      </div>

      <section className="mw-resource-cta" aria-labelledby="updates-cta-title">
        <div>
          <p className="eyebrow">See it rather than read about it</p>
          <h2 id="updates-cta-title">Start with the current work.</h2>
          <p>JobFilter and Scrap Finance Partners are both linked from the homepage, alongside the services and current starting prices.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-dark" href="/#work">See real work</a>
          <a className="text-link" href="/#contact">Tell me the problem <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
