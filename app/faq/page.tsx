import type { Metadata } from 'next';
import { MAZ_WORKS_FAQS } from '../faqs';
import { CONTACT_EMAIL, SITE_URL } from '../site';
import { SiteFooter, SiteHeader } from '../site-chrome';

const PAGE_URL = `${SITE_URL}/faq`;

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Straight answers about Maz Works pricing, demos, websites, automation, AI, support and physical Objects.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Maz Works FAQ',
    description: 'Straight answers about working with Maz Works.',
    url: PAGE_URL,
    type: 'website',
  },
};

export default function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MAZ_WORKS_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="faq-title">
        <p className="eyebrow">FAQ</p>
        <h1 id="faq-title">Questions? Straight answers.</h1>
        <p>Quick, plain answers before you book a call.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="/#contact">Tell me the problem</a>
        </div>
      </section>

      <section className="mw-resource-list" aria-label="Frequently asked questions">
        {MAZ_WORKS_FAQS.map((faq, index) => (
          <article className="mw-resource-row" key={faq.question}>
            <span className="mw-resource-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mw-resource-cta" aria-labelledby="faq-still-title">
        <div>
          <p className="eyebrow">Still unsure?</p>
          <h2 id="faq-still-title">Ask the actual question.</h2>
          <p>Send it by email, or use the form below.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-dark" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20question`}>Email me</a>
          <a className="text-link" href="/#contact">Use the enquiry form <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
