import { OG_IMAGE } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { DemoRequestForm } from '../demo-request-form';
import { CallLink } from '../analytics';
import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL, SITE_URL } from '../site';

export const metadata: Metadata = {
  title: { absolute: 'Contact Maz Works | Fixed-price repairs, websites and rebuilds' },
  description: 'Already know what’s broken, or need a bigger job like a new website or rebuild? Tell Manazir in one line and get a fixed price. No VAT added.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { images: [OG_IMAGE], title: 'Contact Maz Works', description: 'Tell me what’s broken or what you need built. Fixed price, No VAT added.', url: `${SITE_URL}/contact`, type: 'website' },
};

const BIGGER_JOBS = [
  { name: 'Website Launch', price: 'From £495', body: 'A new site, when repairing the old one is not practical.', service: 'website' },
  { name: 'Full Rebuild', price: 'From £1,000', body: 'Your old site or system, rebuilt properly.', service: 'rebuild' },
  { name: 'Automation and software', price: 'Quoted per job', body: 'Repeat admin done for you, or a tool built around your work.', service: 'software' },
];

export default function ContactPage() {
  return (
    <main className="s-home">
      <SiteHeader />
      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="contact-page-title">
        <p className="eyebrow">Contact</p>
        <h1 id="contact-page-title">Tell me what’s broken, or what you need built.</h1>
        <p className="s-lede">One line is enough. I reply by email with a plan and a fixed price. No VAT added.</p>
        <p className="s-note">Not sure what’s wrong? <a href="/leak-check">Get the free check instead</a>, emailed within {CHECK_REPLY_TIME}.</p>
      </section>

      <section className="s-section s-check" id="contact" aria-labelledby="contact-title">
        <div className="s-check-copy">
          <h2 id="contact-title">Send it straight to me.</h2>
          <p>Prefer to talk? <CallLink href={BOOKING_URL} placement="contact">Book a 15-minute call</CallLink>, or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          <h3 className="s-subhead">Bigger jobs</h3>
          <ul className="s-ticks">
            {BIGGER_JOBS.map((job) => <li key={job.name}><strong>{job.name}, {job.price}.</strong> {job.body}</li>)}
          </ul>
          <p className="s-small">Every price is fixed before work starts. You own everything I build.</p>
        </div>
        <DemoRequestForm />
      </section>
      <SiteFooter />
    </main>
  );
}
