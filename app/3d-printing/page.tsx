import type { Metadata } from 'next';
import Image from 'next/image';
import { CONTACT_EMAIL } from '../site';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { TouchCollection } from './touch-collection';
import { TouchDemo } from './touch-demo';
import { TouchEnquiryForm } from './touch-enquiry-form';
import { TouchSelectionProvider } from './touch-selection';

export const metadata: Metadata = {
  title: 'Maz Works Objects — NFC stands, business gifts and useful custom objects',
  description: 'Custom countertop tap stands, small-batch business gifts, recruitment agency gifting, signs and useful 3D-printed objects for clients, candidates, teams and workplaces.',
  alternates: { canonical: '/3d-printing' },
  openGraph: {
    title: 'Maz Works Objects — Touch + Business Gifting',
    description: 'One tap. One useful next step. Plus useful physical objects for client gifting, recruitment and real workplaces.',
    url: '/3d-printing',
    images: [{
      url: '/objects/touch-three-hero.webp', width: 1536, height: 1024,
      alt: 'Concept visual of the black-and-white Touch Three stand',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maz Works Objects — Touch + Business Gifting',
    description: 'One tap. One useful next step.',
    images: ['/objects/touch-three-hero.webp'],
  },
};

const ORDERING_STEPS = [
  ['01', 'Choose what you need', 'Pick one stand or a bundle that matches the number of places you want customers to reach.'],
  ['02', 'Tell me what each tap should open', 'Reviews, your menu, bookings, Instagram, your website or something else. If you do not have the links ready, I can help find them.'],
  ['03', 'Approve the look and price', 'You see the proposed wording, layout and final quote before anything is made.'],
  ['04', 'I make it and test it', 'I prepare the agreed objects, check the links and include a simple QR backup where the product allows it.'],
];

const CUSTOMER_STEPS = [
  ['01', 'Tap or scan', 'The customer taps the marked area with their phone, or scans the QR backup.'],
  ['02', 'The right page opens', 'They go straight to the review page, menu, booking page, social profile or website you chose.'],
  ['03', 'They carry on', 'They review, order, book, follow or browse on the page that opened.'],
];

const FAQS = [
  ['What happens when someone taps?', 'Their phone is offered the web page you chose. For example: your Google review page, menu, booking page, Instagram or website. A QR backup is included on suitable stand designs.'],
  ['Does the customer need a Maz Works app?', 'No. They use their phone as normal. The page you send them to may still have its own sign-in rules — Google reviews are one example.'],
  ['Will it work with every phone?', 'Most modern phones can use tap-to-open links, but cases, phone settings and tap position can affect it. That is why suitable stands also use a QR backup rather than pretending every phone behaves the same way.'],
  ['Does it need charging?', 'No. The tap part does not need a battery or charging cable.'],
  ['Can each tap open something different?', 'Yes. Touch Three can send customers to up to three different pages, such as Menu, Reviews and Bookings.'],
  ['Can I change a link later?', 'Usually, yes, if the tag has not been permanently locked. A printed QR code would still show the old link, so I would confirm the easiest update route before changing anything.'],
  ['Can I add my logo or artwork?', 'Yes. The £10 artwork option covers one supplied design used across the bundle, basic placement and one proof revision. More detailed artwork or redrawing is quoted separately.'],
  ['What colours and material do you use?', 'The launch look is black and white. The first production direction is an indoor 3D-printed plastic finish. If you want another colour or finish, ask first and I will confirm what is realistic before quoting.'],
  ['Can I see the design before you make it?', 'Yes. You approve the direction and final price before production starts.'],
  ['Do you make recurring business gifts?', 'Yes. I can keep an approved product direction on file and personalise small batches for new clients, renewals, referrals, milestones, staff or events. Quantity, turnaround and postage are agreed before production.'],
  ['Can this work for a recruitment agency?', 'Yes. Recruitment uses can include placement gifts, hiring-manager desk objects, candidate referral pieces, job-fair tap points, internal awards and client-branded onboarding pieces. The physical object can also link to a vacancy page, referral form, candidate guide, review request or booking page.'],
  ['Are there subscriptions?', 'Not for a stand that opens pages you already own. Websites, hosted campaign pages, ongoing link management or a recurring business-gifting arrangement are separate only if you actually need them.'],
  ['Can you build the page it opens?', 'Yes. Maz Works can also build or improve the website, menu, booking journey or campaign page. That is quoted separately rather than hidden inside the object price.'],
];

export default function ObjectsPage() {
  return (
    <TouchSelectionProvider>
      <main className="objects-page">
        <SiteHeader />

        <section className="objects-hero" id="main-content" tabIndex={-1} aria-labelledby="objects-title">
          <div className="objects-hero-copy">
            <p className="objects-kicker">Maz Works Objects / Touch</p>
            <h1 id="objects-title">One tap.<br />One useful next step.</h1>
            <p>Small custom objects that help customers, clients and teams reach the right next action without hunting for it.</p>
            <div className="objects-actions">
              <a className="objects-button objects-button-dark" href="#collection">Choose a Touch</a>
              <a className="objects-text-link" href="#personalise">Get a quote <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="objects-hero-visual">
            <Image src="/objects/touch-three-hero.webp" alt="Concept render of a low rounded black stand holding three white tap discs for menu, reviews and bookings" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 52vw" priority unoptimized />
            <figcaption><span>Concept visual</span><span>Touch Three / 3 tap points</span></figcaption>
          </figure>
        </section>

        <TouchCollection />

        <details className="objects-disclosure objects-demo-disclosure">
          <summary><span>Try the idea</span><small>Interactive Touch example</small></summary>
          <TouchDemo />
        </details>

        <details className="objects-disclosure" id="how-it-works">
          <summary><span>How Touch works</span><small>Ordering + customer journey</small></summary>
          <div className="objects-disclosure-body">
            <section className="objects-how" aria-labelledby="how-title">
              <header><p className="objects-kicker">Simple by default</p><h2 id="how-title">Easy for you. Obvious for the customer.</h2></header>
              <div className="objects-journeys">
                <div><h3>Getting yours</h3><ol>{ORDERING_STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></div>
                <div><h3>What the customer does</h3><ol>{CUSTOMER_STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></div>
              </div>
            </section>
          </div>
        </details>

        <section className="objects-section objects-faq" id="faq" aria-labelledby="faq-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Questions</p><h2 id="faq-title">Open only what you need.</h2></div>
            <p>If something affects price, appearance or how customers use it, I confirm it before you approve the order.</p>
          </header>
          <div className="objects-faq-list">
            {FAQS.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>

        <TouchEnquiryForm />

        <section className="objects-section objects-usecases" id="business-gifts" aria-labelledby="usecases-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Beyond the counter</p><h2 id="usecases-title">One object system. Different business moments.</h2></div>
            <p>Maz Works can reuse an approved product direction across client gifts, campaigns, recruitment, staff moments and custom business workflows.</p>
          </header>

          <div className="objects-usecase-grid">
            <details className="objects-usecase">
              <summary><span>01</span><div><strong>Business gifting</strong><small>Small batches / personalised / repeatable</small></div></summary>
              <div className="objects-usecase-body">
                <p>Custom physical gifts for B2B companies that want something more personal than generic promotional merchandise. Start with a small run, approve the design once, then personalise future pieces as clients, staff or milestones come up.</p>
                <ul><li>New client gifts</li><li>Renewal + milestone gifts</li><li>Events + small runs</li><li>Ongoing gift partner</li></ul>
                <p><strong>Keep the design. Change the recipient.</strong> A reusable desk object, magnetic piece, NFC object, branded stand or custom miniature can change name, company, date, message or destination without restarting the project every time.</p>
                <a className="objects-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Business%20Gifting%20Enquiry`}>Ask about business gifting →</a>
              </div>
            </details>

            <details className="objects-usecase" id="recruitment">
              <summary><span>02</span><div><strong>Recruitment agencies</strong><small>Candidate + client relationship tools</small></div></summary>
              <div className="objects-usecase-body">
                <p>Recruitment is built on repeat relationships. Small-run physical products can connect to NFC, QR and simple web workflows instead of becoming generic merchandise.</p>
                <ul><li>Placement gift</li><li>Hiring-manager desk object</li><li>Referral + review piece</li><li>Job-fair tap point</li><li>Recruiter awards</li><li>Client-branded onboarding objects</li></ul>
                <p><strong>A repeatable placement system, not just merchandise.</strong> The same object can link to interview prep, a candidate portal, referral form, review request, live vacancies or a hiring-manager booking page. Any CRM integration is confirmed against the agency&apos;s current system before it is promised.</p>
                <a className="objects-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Recruitment%20Agency%20Enquiry`}>Build a recruitment agency pack →</a>
              </div>
            </details>

            <details className="objects-usecase">
              <summary><span>03</span><div><strong>Custom business objects</strong><small>Signs / holders / docks / connected pieces</small></div></summary>
              <div className="objects-usecase-body">
                <p>Tell me what needs holding, displaying, organising, gifting or connecting to a customer action. I&apos;ll tell you what is realistic before quoting.</p>
                <a className="objects-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Objects%20custom%20enquiry`}>Ask about a custom object →</a>
              </div>
            </details>
          </div>
        </section>

        <section className="objects-other" aria-labelledby="other-title">
          <p className="objects-kicker">Need something different?</p>
          <div><h2 id="other-title">Useful physical products, without the catalogue maze.</h2><p>Send the problem, rough quantity and where the object will be used. I&apos;ll suggest the simplest realistic route.</p></div>
          <a className="objects-button objects-button-signal" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Objects%20custom%20enquiry`}>Ask about an object</a>
        </section>

        <SiteFooter />
      </main>
    </TouchSelectionProvider>
  );
}
