import type { Metadata } from 'next';
import Image from 'next/image';
import { CONTACT_EMAIL } from '../site';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { TouchCollection } from './touch-collection';
import { TouchDemo } from './touch-demo';
import { TouchEnquiryForm } from './touch-enquiry-form';
import { TouchSelectionProvider } from './touch-selection';

export const metadata: Metadata = {
  title: 'Maz Works Objects — Touch NFC stands',
  description: 'Explore Touch: custom 3D-printed NFC stands and objects that connect customers to menus, reviews, bookings and more.',
  alternates: { canonical: '/3d-printing' },
  openGraph: {
    title: 'Maz Works Objects — Touch',
    description: 'Small objects. Useful connections. Custom 3D-printed NFC stands by Maz Works.',
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
    title: 'Maz Works Objects — Touch',
    description: 'Small objects. Useful connections.',
    images: ['/objects/touch-three-hero.webp'],
  },
};

const ORDERING_STEPS = [
  ['01', 'Choose a bundle', 'Pick the physical quantity and number of destinations that fit the job.'],
  ['02', 'Send the details', 'Share the intended uses, business-name text and any links you already have.'],
  ['03', 'Approve design + final price', 'Review the proposed layout, material confirmation, delivery and any nonstandard quote.'],
  ['04', 'Print, configure + test', 'After approval, the parts are produced and each agreed NFC destination is configured and checked.'],
  ['05', 'Hand over', 'Receive the finished objects with their matching QR backups and simple use guidance.'],
];

const CUSTOMER_STEPS = [
  ['01', 'Tap or scan', 'Hold a compatible phone near the chosen disc, or use the matching QR fallback.'],
  ['02', 'Open the destination', 'The phone opens the configured menu, review, booking, social or website page.'],
  ['03', 'Choose the next action', 'The customer continues on that page—for example ordering, reviewing or booking.'],
];

const FAQS = [
  ['What happens when someone taps?', 'A compatible NFC phone can read the web-link tag and offer to open its destination. The destination itself may ask the visitor to log in—for example, a review platform. A matching QR code provides the fallback.'],
  ['Does the customer need an app or account?', 'No special Maz Works app or account is needed to read a standard web link. The page being opened may have its own sign-in requirements, depending on the service.'],
  ['Which phones work, and what if tapping fails?', 'Many modern phones include NFC, but model, settings, case thickness and tap position can affect reading. It would be inaccurate to promise every phone. If tapping fails, the customer can scan the matching QR code.'],
  ['Do the discs need charging?', 'No. NFC tags are passive: the compatible phone provides the small amount of energy needed to read the tag.'],
  ['Does opening the linked page need internet?', 'The tap itself does not need a battery in the disc, but linked web content usually needs internet access to load.'],
  ['Can each disc open a different link?', 'Yes. Touch Three supports up to three destinations, so its three discs can each be configured for a different agreed link.'],
  ['Can links be changed later?', 'Rewriting an unlocked tag can change its NFC destination, but it does not change a printed QR code. A shared editable destination would need a maintained redirect service; Maz Works does not currently claim that service is included. Production tags will not be permanently locked without an agreed reason.'],
  ['Can discs or branding be replaced?', 'The concept uses removable discs so replacements can be discussed without replacing the whole stand. The exact retention and replacement process still needs physical prototype testing before production promises are made.'],
  ['What does the £10 artwork option include?', 'It covers one supplied artwork design reused across the bundle, basic placement and one proof revision. Artwork must suit the production method. Complex redrawing, extra designs and detailed imagery are quoted separately; full-colour photographic printing is not included.'],
  ['Which colours are available?', 'The launch finish is black and white only. You can ask about a future colour in the enquiry, but availability is not promised until the actual filament and design are confirmed.'],
  ['What material is used, and how should it be cared for?', 'The planned prototype material is PLA, subject to confirming the actual filament before production. The current guidance is indoor use, avoiding high heat, and gentle cleaning with a soft, slightly damp cloth. Dishwasher, food-contact and outdoor-durability claims are not being made.'],
  ['Can I approve the design first?', 'Yes. You approve the proposed design and final price before printing begins. One proof revision is included with the artwork option.'],
  ['How are delivery cost and timing agreed?', 'They are confirmed after the destination, design, quantity and delivery location are understood. No stock level, turnaround time or delivery price is assumed on this page.'],
  ['Are there subscriptions?', 'No subscription for direct links to existing pages. Website creation, hosted landing pages, maintained redirects and ongoing link updates are separate services quoted only when needed.'],
  ['Can you build the page it opens?', 'Yes. Maz Works can quote separately for a website, menu, campaign or hosted landing page. It is not hidden inside the Touch product price.'],
  ['Can I request a different object or larger quantity?', 'Yes. Ask about signs, holders, enclosures, prototypes or a larger run. They are scoped as custom enquiries rather than a fourth priced Touch package.'],
];

export default function ObjectsPage() {
  return (
    <TouchSelectionProvider>
      <main className="objects-page">
        <SiteHeader />

        <section className="objects-hero" id="main-content" tabIndex={-1} aria-labelledby="objects-title">
          <div className="objects-hero-copy">
            <p className="objects-kicker">Maz Works Objects / Touch collection</p>
            <h1 id="objects-title">Small objects.<br />Useful connections.</h1>
            <p>Custom 3D-printed stands that connect customers to menus, reviews, bookings and more—without making them learn the technology.</p>
            <div className="objects-actions">
              <a className="objects-button objects-button-dark" href="#collection">Explore the collection</a>
              <a className="objects-text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="objects-hero-visual">
            <Image src="/objects/touch-three-hero.webp" alt="Concept render of a low rounded black stand holding three removable white NFC discs for menu, reviews and bookings" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 58vw" priority unoptimized />
            <figcaption><span>Concept visual</span><span>Touch Three / 1 stand + 3 discs</span></figcaption>
          </figure>
          <p className="objects-hero-side-note">Tap targets,<br />not push-buttons.</p>
        </section>

        <TouchCollection />
        <TouchDemo />

        <section className="objects-section objects-details" id="details" aria-labelledby="details-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Object details</p><h2 id="details-title">Built to be looked at. Shaped to be used.</h2></div>
            <p>The launch concepts use a coherent family of rounded black bases, white removable circular discs and raised, easy-to-read symbols. Final geometry remains subject to physical prototyping.</p>
          </header>

          <div className="objects-gallery">
            <figure className="objects-gallery-wide">
              <Image src="/objects/touch-three-hero.webp" alt="Concept close view of the raised lettering and three-disc black stand" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 66vw" loading="eager" unoptimized />
              <figcaption><span>Concept visual</span><strong>Raised lettering / tactile FDM finish</strong></figcaption>
            </figure>
            <figure>
              <Image src="/objects/touch-disc-detail.webp" alt="Concept close-up showing one white disc lifted above its recessed pocket" width={1200} height={1200} sizes="(max-width: 760px) 100vw, 34vw" loading="eager" unoptimized />
              <figcaption><span>Concept visual</span><strong>Removable disc / retention method unconfirmed</strong></figcaption>
            </figure>
            <figure className="objects-gallery-full">
              <Image src="/objects/touch-carry-bundle.webp" alt="Concept flat-lay showing one three-disc stand and exactly five matching keyrings" width={1536} height={1024} sizes="100vw" loading="eager" unoptimized />
              <figcaption><span>Concept visual</span><strong>Touch + Carry / 1 stand + 3 discs + 5 keyrings</strong></figcaption>
            </figure>
          </div>

          <aside className="objects-portfolio-edition">
            <div><p className="objects-kicker">First-party concept / Three destinations</p><h3>A Maz Works portfolio set.</h3></div>
            <nav aria-label="Example Maz Works portfolio destinations">
              <a href="https://jobfilter.uk/find-jobs"><span>01</span><strong>JobFilter</strong><small>Live product</small></a>
              <a href="https://github.com/manazoid4/maz-pocket"><span>02</span><strong>MAZ Pocket</strong><small>Project information</small></a>
              <a href="/3d-printing"><span>03</span><strong>Maz Works Objects</strong><small>This collection</small></a>
            </nav>
          </aside>
        </section>

        <section className="objects-how" id="how-it-works" aria-labelledby="how-title">
          <header><p className="objects-kicker">How it works / Two journeys</p><h2 id="how-title">From your idea to their next action.</h2></header>
          <div className="objects-journeys">
            <div><h3>Ordering</h3><ol>{ORDERING_STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></div>
            <div><h3>Customer use</h3><ol>{CUSTOMER_STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></div>
          </div>
        </section>

        <TouchEnquiryForm />

        <section className="objects-section objects-faq" id="faq" aria-labelledby="faq-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Useful answers</p><h2 id="faq-title">Before the first print.</h2></div>
            <p>These answers describe the planned service honestly. Physical fit, exact material and production behaviour still need prototype and NFC testing.</p>
          </header>
          <div className="objects-faq-list">
            {FAQS.map(([question, answer], index) => (
              <details key={question}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{question}</summary>
                <p>{answer}</p>
              </details>
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
