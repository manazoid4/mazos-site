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
      url: '/objects/touch-three-hero.webp',
      width: 1536,
      height: 1024,
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
            <p className="objects-kicker">Maz Works Objects / Touch collection</p>
            <h1 id="objects-title">One tap.<br />One useful next step.</h1>
            <p>Small custom stands that help customers reach your reviews, menu, bookings, social page or website without hunting for the right link.</p>
            <div className="objects-actions">
              <a className="objects-button objects-button-dark" href="#collection">Choose a Touch</a>
              <a className="objects-text-link" href="#business-gifts">Business gifting <span aria-hidden="true">↓</span></a>
              <a className="objects-text-link" href="#recruitment">Recruitment agencies <span aria-hidden="true">↓</span></a>
              <a className="objects-text-link" href="#how-it-works">See how Touch works <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="objects-hero-visual">
            <Image src="/objects/touch-three-hero.webp" alt="Concept render of a low rounded black stand holding three white tap discs for menu, reviews and bookings" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 58vw" priority unoptimized />
            <figcaption><span>Concept visual</span><span>Touch Three / 1 stand + 3 tap points</span></figcaption>
          </figure>
          <p className="objects-hero-side-note">Made for<br />real counters.</p>
        </section>

        <TouchCollection />
        <TouchDemo />

        <section className="objects-section objects-details" id="details" aria-labelledby="details-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Designed to belong in the shop</p><h2 id="details-title">Useful enough to keep out. Simple enough to understand.</h2></div>
            <p>The launch style is deliberately clean: rounded black bases, white tap areas and clear raised wording. You approve the final look before production.</p>
          </header>

          <div className="objects-gallery">
            <figure className="objects-gallery-wide">
              <Image src="/objects/touch-three-hero.webp" alt="Concept close view of the raised lettering and three-tap black stand" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 66vw" loading="eager" unoptimized />
              <figcaption><span>Concept visual</span><strong>Raised wording / clean countertop finish</strong></figcaption>
            </figure>
            <figure>
              <Image src="/objects/touch-disc-detail.webp" alt="Concept close-up showing one white tap disc lifted above its place in the stand" width={1200} height={1200} sizes="(max-width: 760px) 100vw, 34vw" loading="eager" unoptimized />
              <figcaption><span>Concept visual</span><strong>Replaceable tap piece</strong></figcaption>
            </figure>
            <figure className="objects-gallery-full">
              <Image src="/objects/touch-carry-bundle.webp" alt="Concept flat-lay showing one three-tap stand and exactly five matching keyrings" width={1536} height={1024} sizes="100vw" loading="eager" unoptimized />
              <figcaption><span>Concept visual</span><strong>Touch + Carry / 1 stand + 5 matching keyrings</strong></figcaption>
            </figure>
          </div>

          <aside className="objects-portfolio-edition">
            <div><p className="objects-kicker">Example setup / Three different actions</p><h3>One stand can guide three different next steps.</h3></div>
            <nav aria-label="Example tap destinations">
              <a href="https://jobfilter.uk/find-jobs"><span>01</span><strong>Open a product</strong><small>Example live page</small></a>
              <a href="https://github.com/manazoid4/maz-pocket"><span>02</span><strong>Open project info</strong><small>Example information page</small></a>
              <a href="/3d-printing"><span>03</span><strong>Open this collection</strong><small>Example website page</small></a>
            </nav>
          </aside>
        </section>

        <section className="objects-how" id="how-it-works" aria-labelledby="how-title">
          <header><p className="objects-kicker">How it works</p><h2 id="how-title">Easy for you. Obvious for the customer.</h2></header>
          <div className="objects-journeys">
            <div><h3>Getting yours</h3><ol>{ORDERING_STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></div>
            <div><h3>What the customer does</h3><ol>{CUSTOMER_STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></div>
          </div>
        </section>

        <TouchEnquiryForm />

        <section className="objects-section objects-details" id="business-gifts" aria-labelledby="business-gifts-title">
          <header className="objects-section-heading objects-heading-row">
            <div>
              <p className="objects-kicker">Business gifting / Small batches / Personalised</p>
              <h2 id="business-gifts-title">Made for the people your business wants to remember.</h2>
            </div>
            <p>Custom physical gifts for B2B companies that want something more personal than generic promotional merchandise. Start with a small run, approve the design once, then personalise future pieces as clients, staff or milestones come up.</p>
          </header>

          <aside className="objects-portfolio-edition">
            <div>
              <p className="objects-kicker">Useful occasions</p>
              <h3>One product direction. Different names, dates and moments.</h3>
            </div>
            <nav aria-label="Business gifting options">
              <a href="#gift-enquiry"><span>01</span><strong>New client gifts</strong><small>Onboarding / deal close / welcome</small></a>
              <a href="#gift-enquiry"><span>02</span><strong>Renewal + milestone gifts</strong><small>Anniversaries / referrals / achievements</small></a>
              <a href="#gift-enquiry"><span>03</span><strong>Events + small runs</strong><small>Meetings / exhibitions / partner days</small></a>
              <a href="#gift-enquiry"><span>04</span><strong>Ongoing gift partner</strong><small>Approved design kept ready for repeat orders</small></a>
            </nav>
          </aside>

          <div className="objects-artwork-note" id="gift-enquiry">
            <span>How the partnership can work</span>
            <div>
              <h3>Keep the design. Change the recipient.</h3>
              <p>Maz Works can design a reusable gift format for your business — for example a desk object, magnetic piece, NFC object, branded stand or custom miniature. Once approved, future pieces can be personalised with a client name, company, date, message or destination without restarting the project every time.</p>
              <p>Small quantities are welcome. Recurring arrangements, direct-to-recipient postage, packaging and larger runs are quoted around the actual brief rather than hidden behind a generic subscription.</p>
              <a className="objects-button objects-button-dark" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Business%20Gifting%20Enquiry`}>Ask about business gifting</a>
            </div>
          </div>
        </section>

        <section className="objects-section objects-details" id="recruitment" aria-labelledby="recruitment-title">
          <header className="objects-section-heading objects-heading-row">
            <div>
              <p className="objects-kicker">Industry use case / Recruitment agencies</p>
              <h2 id="recruitment-title">Stay on the desk after the placement is made.</h2>
            </div>
            <p>Recruitment is built on repeat relationships. Maz Works can combine small-run physical products with NFC, QR and simple web workflows so candidate, client and referral touchpoints feel considered instead of generic.</p>
          </header>

          <aside className="objects-portfolio-edition">
            <div>
              <p className="objects-kicker">Candidate + client moments</p>
              <h3>Useful objects that can lead somewhere useful too.</h3>
            </div>
            <nav aria-label="Recruitment agency Maz Works ideas">
              <a href="#recruitment-partner"><span>01</span><strong>Placement gift</strong><small>Personalised desk piece / start date / tap to onboarding</small></a>
              <a href="#recruitment-partner"><span>02</span><strong>Hiring-manager desk object</strong><small>Tap to brief a vacancy / book a recruiter / contact the team</small></a>
              <a href="#recruitment-partner"><span>03</span><strong>Referral + review piece</strong><small>Unique NFC or QR route to refer, review or recommend</small></a>
              <a href="#recruitment-partner"><span>04</span><strong>Job-fair tap point</strong><small>Live jobs / registration / candidate guide / event campaign</small></a>
              <a href="#recruitment-partner"><span>05</span><strong>Recruiter awards</strong><small>Top biller / placement milestones / team recognition</small></a>
              <a href="#recruitment-partner"><span>06</span><strong>Client-branded onboarding objects</strong><small>Small-run pieces the agency can provide to placed candidates</small></a>
            </nav>
          </aside>

          <div className="objects-artwork-note" id="recruitment-partner">
            <span>Physical + digital</span>
            <div>
              <h3>A repeatable placement system, not just merchandise.</h3>
              <p>The agency can approve a core object once. Each new placement can then change the name, employer, date, message or NFC destination. The same physical system can connect to an interview-prep page, candidate portal, referral form, review request, live vacancies or a hiring-manager booking page.</p>
              <p>Maz Works can also scope the digital layer behind it — landing pages, forms, referral tracking, follow-up automation or a workflow that prepares a gifting request from an existing recruitment process. Any CRM integration would be confirmed against the agency’s current system before it is promised.</p>
              <a className="objects-button objects-button-dark" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Recruitment%20Agency%20Enquiry`}>Build a recruitment agency pack</a>
            </div>
          </div>
        </section>

        <section className="objects-section objects-faq" id="faq" aria-labelledby="faq-title">
          <header className="objects-section-heading objects-heading-row">
            <div><p className="objects-kicker">Questions</p><h2 id="faq-title">The useful answers.</h2></div>
            <p>If something affects price, appearance or how customers use it, I confirm it before you approve the order.</p>
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
          <p className="objects-kicker">Need something different?</p>
          <div><h2 id="other-title">Signs, gifts, holders, stands and useful business objects.</h2><p>Tell me what needs holding, displaying, organising, gifting or connecting to a customer action. I’ll tell you what is realistic before quoting.</p></div>
          <a className="objects-button objects-button-signal" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Objects%20custom%20enquiry`}>Ask about an object</a>
        </section>

        <SiteFooter />
      </main>
    </TouchSelectionProvider>
  );
}
