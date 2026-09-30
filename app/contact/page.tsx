import { OG_IMAGE } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { LeakCheckForm } from '../leak-check/leak-check-form';
import { StickyCheckCta } from '../sticky-cta';
import { CallLink } from '../analytics';
import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL, SITE_URL } from '../site';
import { FREE_STEP, OFFERS, PAYMENT_TERMS } from '../offers';

export const metadata: Metadata = {
  title: { absolute: 'Contact Maz Works | Booking systems, automation and custom tools' },
  description: 'Tell Manazir what you need: automation from £195, a joined-up business system, review and reminder systems, custom software or a website. One line is enough. Fixed quote, No VAT added.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { images: [OG_IMAGE], title: 'Contact Maz Works', description: 'Tell me what you need built. Fixed quote, No VAT added.', url: `${SITE_URL}/contact`, type: 'website' },
};

const BIGGER_JOBS = OFFERS.map((offer) => ({ name: offer.name, price: offer.price, body: offer.body }));

export default function ContactPage() {
  return (
    <main className="s-home">
      <SiteHeader />
      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="contact-page-title">
        <p className="eyebrow">Contact</p>
        <h1 id="contact-page-title">Tell me what you need built.</h1>
        <p className="s-lede">One line is enough. I reply by email with a plan and a fixed quote. No VAT added.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="/leak-check?src=contact#leak-check-form">Get a free plan and price</a>
        </div>
        <p className="s-note">The {FREE_STEP.name} takes a few taps and is emailed within {CHECK_REPLY_TIME}. Bigger job? Add a line in the optional details.</p>
      </section>

      <section className="s-section s-check" id="contact" aria-labelledby="contact-title">
        <div className="s-check-copy">
          <h2 id="contact-title">Send it straight to me.</h2>
          <p>Prefer to talk? <CallLink href={BOOKING_URL} placement="contact">Book a 15-minute call</CallLink>, or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          <h3 className="s-subhead">What I build</h3>
          <ul className="s-ticks">
            {BIGGER_JOBS.map((job) => <li key={job.name}><strong>{job.name}, {job.price}.</strong> {job.body}</li>)}
          </ul>
          <p className="s-small">Optional extras are priced up front. {PAYMENT_TERMS} You own everything I build.</p>
        </div>
        <LeakCheckForm />
      </section>
      <SiteFooter />
      <StickyCheckCta href="/leak-check?src=contact-sticky#leak-check-form" hideWhenVisible="leak-check-form" />
    </main>
  );
}
