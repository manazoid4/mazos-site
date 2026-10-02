import type { Metadata } from 'next';
import Image from 'next/image';
import { CONTACT_EMAIL } from '../site';
import { SiteFooter } from '../site-chrome';
import { TouchCollection } from './touch-collection';
import { TouchDemo } from './touch-demo';
import { TouchEnquiryForm } from './touch-enquiry-form';
import { TouchSelectionProvider } from './touch-selection';

export const metadata: Metadata = {
  title: 'Personalised tap stands for menus, reviews & bookings',
  description: 'Personalised countertop stands that open your menu, reviews and booking pages with a phone tap or QR scan. From £29.',
  alternates: { canonical: '/3d-printing' },
  openGraph: {
    title: 'Maz Works Objects — personalised tap stands',
    description: 'Help customers open your menu, reviews and booking pages with a phone tap or QR scan. From £29.',
    url: '/3d-printing',
    images: [{
      url: '/objects/touch-three-hero.webp',
      width: 1536,
      height: 1024,
      alt: 'Concept visual of the black-and-white Touch Three NFC stand',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maz Works Objects — personalised tap stands',
    description: 'Your menu, reviews and bookings—one phone tap away.',
    images: ['/objects/touch-three-hero.webp'],
  },
};

const FAQS = [
  ['Using your stand', [
    ['What happens when someone taps?', 'They hold a compatible phone near a disc and open your menu, review page or booking link. If tapping is unavailable, they can scan the matching QR code.'],
    ['Do customers need an app or account?', 'No special app is needed to tap. The page you link to may ask customers to sign in, for example to leave a review.'],
    ['Which phones work?', 'Many modern iPhones and Android phones support NFC, the technology that opens a link with a tap. Settings, cases and phone models can affect it. QR codes offer another way to open the page.'],
    ['Does it need charging or internet?', 'The discs need no batteries or charging. The phone usually needs internet to load the linked page.'],
    ['Can each disc open a different page?', 'Yes. Touch Three can open up to three different pages. The five keyrings in Touch + Carry all share one link. Keyrings do not include QR codes.'],
    ['Can I change my links later?', 'We plan to keep the tap link editable unless you ask otherwise. It can then be updated, but that does not change a printed QR code. Ask us about updating both. An editable web address would need a separately maintained service; that is not included.'],
  ]],
  ['Design and care', [
    ['Can I approve the design first?', 'Yes. We agree your design and final quote before printing.'],
    ['What does the £10 artwork option include?', 'One design you supply, reused across your bundle, with basic placement and one proof revision. We’ll check that it will reproduce clearly. Complex redrawing, extra designs and detailed imagery cost extra; full-colour photo printing is not included.'],
    ['Which colours can I choose?', 'Black and white are the launch finish. Ask about other colours and we’ll confirm what is possible.'],
    ['Can I replace the discs or branding?', 'Replacement discs and updated branding can be discussed with your quote. We’ll confirm the options for your design.'],
    ['What is it made from, and how do I clean it?', 'We plan to use a lightweight 3D-printed plastic and will confirm the exact material with your quote. It is intended for indoor use: keep it away from heat and wipe gently with a soft, slightly damp cloth.'],
  ]],
  ['Your enquiry and quote', [
    ['How much is delivery, and when will it arrive?', 'Tell us your delivery area and any deadline in your enquiry. We’ll confirm delivery cost and timing with your final quote.'],
    ['Is there a subscription?', 'No subscription for direct links to pages you already have. New websites, hosted pages and ongoing updates are quoted separately.'],
    ['Can you build the page it opens?', 'Yes. If you need a menu, website or booking page, mention it in your enquiry and we can quote separately.'],
    ['Can I request another object or a larger quantity?', 'Yes. Ask about signs, holders, enclosures, prototypes or a larger run. We’ll discuss the idea and quote for the work.'],
  ]],
] as const;

export default function ObjectsPage() {
  return (
    <TouchSelectionProvider>
      <main className="objects-page">
        <header className="site-header mw-site-header objects-header">
          <a className="brand" href="/" aria-label="Maz Works Objects home"><span className="brand-mark">MW</span><span><strong>Maz Works Objects</strong><small>Made for your business</small></span></a>
          <nav aria-label="Objects navigation"><a href="#collection">The stands</a><a href="#demo">How it works</a><a href="#faq">Questions</a><a className="mw-nav-cta" href="#personalise-title">Enquire</a></nav>
        </header>

        <section className="objects-hero" id="main-content" tabIndex={-1} aria-labelledby="objects-title">
          <div className="objects-hero-copy">
            <p className="objects-kicker">Maz Works Objects / Touch collection</p>
            <h1 id="objects-title">Your menu, reviews and bookings—one phone tap away.</h1>
            <p>Personalised countertop stands that help customers open your pages. Tap with a compatible phone or scan the QR code.</p>
            <div className="objects-actions">
              <a className="objects-button objects-button-dark" href="#collection">Choose your stand</a>
              <a className="objects-text-link" href="#demo">See how it works <span aria-hidden="true">↓</span></a>
            </div>
            <p className="objects-hero-reassurance"><strong>From £29 · Setup included</strong><br />No payment now. Design and final quote agreed first.</p>
          </div>
          <figure className="objects-hero-visual">
            <Image src="/objects/touch-three-hero.webp" alt="Concept render of a low rounded black stand holding three removable white NFC discs for menu, reviews and bookings" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 58vw" priority unoptimized />
            <figcaption><span>Concept visual</span><span>Touch Three / 1 stand + 3 discs</span></figcaption>
          </figure>

        </section>

        <p className="objects-concept-note">Currently at concept stage. Enquire about your design; production details and the final quote are agreed before printing.</p>
        <TouchDemo />
        <TouchCollection />
        <TouchEnquiryForm />
        <section className="objects-section objects-ordering" aria-labelledby="ordering-title">
          <h2 id="ordering-title">We handle the setup.</h2>
          <ol><li><strong>Tell us your idea</strong><p>Choose a stand or ask for help. You can send your links later.</p></li><li><strong>Approve your design</strong><p>We agree the look, final price and delivery before printing.</p></li><li><strong>Receive your stand</strong><p>We print, set up and test your links, then hand it over with simple instructions.</p></li></ol>
        </section>
        <section className="objects-section objects-faq" id="faq" aria-labelledby="faq-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Useful answers</p><h2 id="faq-title">A few useful answers.</h2></div>

          </header>
          <div className="objects-faq-list">
            {FAQS.map(([group, questions]) => (
              <div className="objects-faq-group" key={group}><h3>{group}</h3>{questions.map(([question, answer]) => (
                <details key={question}><summary>{question}</summary><p>{answer}</p></details>
              ))}</div>
            ))}
          </div>
        </section>

        <section className="objects-other" aria-labelledby="other-title">
          <p className="objects-kicker">Beyond Touch / Custom enquiry</p>
          <div><h2 id="other-title">Signs, holders, enclosures and prototypes.</h2><p>Need a different useful object or a larger quantity? Describe the job and I’ll confirm what is realistic before quoting.</p></div>
          <a className="objects-button objects-button-signal" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Objects%20custom%20enquiry`}>Ask about another object</a>
        </section>

        <SiteFooter />
      </main>
    </TouchSelectionProvider>
  );
}
