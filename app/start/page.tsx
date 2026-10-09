import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { LeakCheckForm } from '../free-plan/leak-check-form';
import { NEXT_STEPS, OFFERS } from '../offers';
import { CHECK_REPLY_TIME } from '../site';

/**
 * After "Buy now" (plan v3, C11): the Stripe payment link's success URL lands
 * here with ?package=<name>, and the same form collects the intake. No call
 * needed for small jobs.
 */
export const metadata: Metadata = {
  title: 'Paid: tell me the job',
  description: `Thanks for buying. Tell me the job and your apps, and I start within ${CHECK_REPLY_TIME}.`,
  alternates: { canonical: '/start' },
  robots: { index: false, follow: true },
};

export default function StartPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="start-title">
        <p className="eyebrow">Thank you · payment received</p>
        <h1 id="start-title">Now tell me the job, and I’ll get started.</h1>
        <p>Three taps and one line is enough. I confirm by email within {CHECK_REPLY_TIME}, then follow the steps below. Not paid yet? Start with the <a href="/free-plan">free demo</a> instead.</p>
      </section>
      <section className="mw-qw-section" aria-labelledby="start-form-title">
        <p className="eyebrow">Your intake</p>
        <h2 id="start-form-title">What should run on its own, and on which apps?</h2>
        <LeakCheckForm />
      </section>
      <section className="mw-qw-section" aria-labelledby="start-next-title">
        <p className="eyebrow">What happens next</p>
        <h2 id="start-next-title">Live in about a week for a {OFFERS[0].name}.</h2>
        <ol className="mw-qw-list">{NEXT_STEPS.map((step) => <li key={step.day}><strong>{step.day}: {step.title}.</strong> {step.body}</li>)}</ol>
      </section>
      <SiteFooter />
    </main>
  );
}
