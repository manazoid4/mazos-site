import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '../breadcrumbs';
import { CONTACT_EMAIL } from '../site';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { TouchCollection } from './touch-collection';
import { TouchDemo } from './touch-demo';
import { TouchEnquiryForm } from './touch-enquiry-form';
import { TouchSelectionProvider } from './touch-selection';

export const metadata: Metadata = {
  title: 'Objects: tap stands and signs',
  description: fitDescription('Custom countertop tap stands, small-batch business gifts, simple architectural presentation models, signs and useful 3D-printed objects for real workplaces.'),
  alternates: { canonical: '/3d-printing' },
  openGraph: {
    title: 'Maz Works Objects — Touch + Business Gifting',
    description: fitDescription('One tap. One useful next step. Plus useful physical objects for client gifting, project presentation and real workplaces.'),
    url: '/3d-printing',
    images: [{
      url: '/objects/touch-three-hero.png', width: 1536, height: 1024,
      alt: 'Illustrative sketch of the Touch Three stand with three tap discs for menu, reviews and bookings',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maz Works Objects — Touch + Business Gifting',
    description: fitDescription('One tap. One useful next step.'),
    images: ['/objects/touch-three-hero.png'],
  },
};

const FAQS = [
  ['What happens when someone taps?', 'Their phone opens the page you chose, like reviews or your menu. No app is needed. Suitable stands also have a QR backup.'],
  ['Will it work with every phone?', 'Most modern phones can open tap links. But cases, phone settings and tap position can affect it. That is why suitable stands include a QR backup.'],
  ['Does it need charging?', 'No. The tap part does not need a battery or charging cable.'],
  ['Can I change a link later?', 'Usually, yes. But a printed QR code would still show the old link. I will confirm the easiest way before changing anything.'],
  ['What colours and material do you use?', 'The launch look is black and white. It is an indoor 3D-printed plastic finish. Ask first if you want another colour.'],
  ['Can I see the design before you make it?', 'Yes. You approve the direction and final price before production starts.'],
  ['Are there subscriptions?', 'Not for a stand that opens pages you already own. Ongoing page or link work is extra only if you need it.'],
  ['Can you build the page behind the tap?', 'Yes. I can build the booking page, form or campaign page. That is quoted separately, never hidden in the stand price.'],
  ['Architectural models?', 'Simple concept or massing models, possibly. Send the file and scale; I’ll confirm feasibility first, before any price.'],
];

const ARCH_VISUALS = [
  { src: '/architecture/massing-model.svg', title: 'Massing model.', body: 'A simple 1:500 printed block model on a site base, with a QR plaque.', alt: 'Illustrative axonometric of a simple 1:500 massing model on a site base, with a QR and tap plaque that opens the project page' },
  { src: '/architecture/site-plan.svg', title: 'Site plan.', body: 'Boundary, footprint, access and north point, clean enough for a client pack.', alt: 'Illustrative site plan with a proposed dwelling, garage, trees, access road, north arrow and scale bar' },
  { src: '/architecture/floor-plan.svg', title: 'Floor plan.', body: 'Rooms, doors and key dimensions, laid out so a client can follow it.', alt: 'Illustrative ground floor plan with living room, hall, dining room, kitchen, study and stair' },
  { src: '/architecture/scaffold-elevation.svg', title: 'Scaffold elevation.', body: 'Shows a client or neighbour where access scaffold goes and how high.', alt: 'Illustrative front elevation of a two-storey house with access scaffold, labelled standards, boarded lifts, guard rails, bracing and base plates' },
];

export default function ObjectsPage() {
  return (
    <TouchSelectionProvider>
      <main className="objects-page">
        <SiteHeader />
        <Breadcrumbs items={[{ label: 'Objects' }]} />

        <section className="objects-hero" id="main-content" tabIndex={-1} aria-labelledby="objects-title">
          <div className="objects-hero-copy">
            <p className="objects-kicker">Maz Works Objects / Touch</p>
            <h1 id="objects-title">One tap.<br />One useful next step.</h1>
            <p>Small stands that send customers to your reviews, menu or bookings.</p>
            <div className="objects-actions">
              <a className="objects-button objects-button-dark" href="#collection">Choose a Touch</a>
              <a className="objects-text-link" href="#personalise">Get a quote <span aria-hidden="true">↓</span></a>
              <a className="objects-text-link" href="#architecture-property">Architecture models <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="objects-hero-visual">
            <Image src="/objects/touch-three-hero.svg" alt="Sketch of a low angled stand holding three tap discs for menu, reviews and bookings, with labelled tap points" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 52vw" priority unoptimized />
            <figcaption><span>Illustrative sketch</span><span>Touch Three / 3 tap points</span></figcaption>
          </figure>
        </section>

        <TouchCollection />

        <details className="objects-disclosure objects-demo-disclosure">
          <summary><span>Try the idea</span><small>Interactive Touch example</small></summary>
          <TouchDemo />
        </details>

        <details className="objects-disclosure objects-faq-disclosure" id="faq">
          <summary><span>Questions</span><small>{FAQS.length} short answers</small></summary>
          <div className="objects-disclosure-body objects-faq">
            <div className="objects-faq-list">
              {FAQS.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{question}</summary><p>{answer}</p></details>)}
            </div>
          </div>
        </details>

        <TouchEnquiryForm />

        <section className="objects-section objects-usecases" id="business-gifts" aria-labelledby="usecases-title">
          <header className="objects-section-heading">
            <div><p className="objects-kicker">Beyond the counter</p><h2 id="usecases-title">Business gifts and custom objects.</h2></div>
          </header>

          <div className="objects-usecase-grid">
            <details className="objects-usecase">
              <summary><span>01</span><div><strong>Business gifting</strong><small>Small batches / personalised</small></div></summary>
              <div className="objects-usecase-body">
                <p>Personal gifts for new clients, renewals, staff and milestones. Keep the design and change the name, date or message. Quantity, timing and postage are agreed first.</p>
                <a className="objects-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Business%20Gifting%20Enquiry`}>Ask about business gifting →</a>
              </div>
            </details>

            <details className="objects-usecase" id="recruitment">
              <summary><span>02</span><div><strong>Recruitment agencies</strong><small>Candidate + client gifts</small></div></summary>
              <div className="objects-usecase-body">
                <p>Placement gifts, desk pieces, referral tap points and job-fair stands. Each can open vacancies, a referral form or a booking page. Links to your own systems are checked before I promise them.</p>
                <a className="objects-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Recruitment%20Agency%20Enquiry`}>Build a recruitment agency pack →</a>
              </div>
            </details>

            <details className="objects-usecase">
              <summary><span>03</span><div><strong>Custom business objects</strong><small>Signs / holders / docks</small></div></summary>
              <div className="objects-usecase-body">
                <p>Tell me what needs holding, showing or connecting. I&apos;ll say what is realistic before quoting.</p>
                <a className="objects-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Objects%20custom%20enquiry`}>Ask about a custom object →</a>
              </div>
            </details>

            <a className="objects-usecase objects-usecase-link" href="#architecture-property">
              <span>04</span><div><strong>Architecture &amp; property</strong><small>Models and drawings ↓</small></div>
            </a>
          </div>
        </section>


        <section className="objects-section mw-arch" id="architecture-property" aria-labelledby="arch-title">
          <header className="objects-section-heading">
            <div>
              <p className="objects-kicker">Architecture &amp; property</p>
              <h2 id="arch-title">Simple models and clear drawings that open the project.</h2>
            </div>
          </header>
          <p className="mw-arch-lede">For architects, developers and builders who want a client to see the scheme, not just read about it. Send what you have: a CAD or SketchUp file, a PDF plan or a sketch with dimensions.</p>

          <div className="mw-figures mw-figures-4">
            {ARCH_VISUALS.map((visual) => (
              <figure key={visual.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={visual.src} alt={visual.alt} width={800} height={560} loading="lazy" />
                <figcaption><strong>{visual.title}</strong> {visual.body}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mw-arch-note">Illustrations made for this page, not client work.</p>

          <ol className="mw-arch-steps">
            <li><strong>Send the file and the scale.</strong> Tell me what the model or drawing is for.</li>
            <li><strong>I confirm what’s realistic.</strong> Then a fixed price, before anything is printed or drawn.</li>
            <li><strong>You get it with a QR or tap plaque.</strong> It opens your project page or enquiry form.</li>
          </ol>
          <p className="mw-arch-note">Presentation drawings only. Structural, planning or scaffold design drawings stay with your engineer or scaffold contractor.</p>

          <div className="objects-actions">
            <a className="objects-button objects-button-dark" href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20architecture%20model%20or%20drawing`}>Ask about a model or drawing</a>
            <a className="objects-text-link" href="/for/architects">Guide for architecture practices →</a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </TouchSelectionProvider>
  );
}
