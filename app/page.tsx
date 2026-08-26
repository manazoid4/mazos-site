const PRICES = [
  { label: 'Quick fix', price: '£150', detail: 'Flat rate. Fix what is broken on your current site or booking flow.' },
  { label: 'Full site build', price: 'from £299', detail: 'Fixed price. Live demo before you pay. In days, not weeks.' },
  { label: 'Automation / AI system', price: 'from £499', detail: 'The follow-up work that turns enquiries into paying customers.' },
  { label: 'Support', price: 'from £49/mo', detail: 'Ongoing changes and monitoring. Cancel any time.' },
];

const GAPS = [
  {
    title: 'Certainty',
    body: 'Most agencies hide their price behind a sales call. Most cheap freelancers hide the risk. Every price on this page is public, and you see a working demo before you pay anything.',
  },
  {
    title: 'The missing middle',
    body: 'Builders stop at launch. Agencies stop at design. Automation consultants want a retainer. Your broken enquiry follow-up sits in the gap between all three — that is what I fix.',
  },
  {
    title: 'A named human',
    body: 'Fiverr sits at 2.3/5 on Trustpilot across nearly 15,000 reviews. I am one UK-based person, I answer my own emails, and I do not disappear mid-project.',
  },
];

const CASE_STUDIES = [
  {
    name: 'Scrap Finance Partners',
    result: 'Full digital presence, lead journey, and guarded acquisition automation for a UK scrap-yard finance consultancy.',
    href: 'https://github.com/manazoid4/scrap-finance-partners',
  },
  {
    name: 'JobFilter',
    result: 'Procurement-scanning product for UK trades: opportunity detection, fit scoring, alerts, and a bid workflow.',
    href: 'https://github.com/manazoid4/JobFilterV1',
  },
];

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <a className="nameplate" href="#main-content" aria-label="Maz Works, back to top">
          Maz Works
        </a>
        <nav aria-label="Primary navigation">
          <a href="#pricing">Pricing</a>
          <a href="#work">Work</a>
          <a href="#contact">Get a demo</a>
        </nav>
      </header>

      <section className="hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="hero-statement">
          <p className="identity">UK-based · Fixed-price websites, automation and AI systems for small businesses</p>
          <h1 id="intro-title">
            £299 fixed, your rebuilt page working live on this call, done in days, no contract.
          </h1>
          <p className="hero-copy">
            Before you pay anything, I build a near-working demo around your actual business problem and walk you
            through it live. No sales calls. No retainers to escape. No eight-week timelines.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Get your free demo</a>
            <a className="button secondary" href="#pricing">See prices</a>
          </div>
        </div>

        <aside className="hero-dossier" aria-label="Why Maz Works">
          <p>Why this beats the alternatives</p>
          <ul>
            <li><span>GoDaddy</span>6–8 weeks, price behind a call</li>
            <li><span>Yell</span>subscription lock-in, no public price</li>
            <li><span>Fiverr</span>2.3/5 on Trustpilot, 14,838 reviews</li>
            <li><span>Maz Works</span>fixed price, demo first, days not weeks</li>
          </ul>
        </aside>
      </section>

      <section className="role-fit" id="pricing" aria-labelledby="pricing-title">
        <div className="section-intro compact">
          <h2 id="pricing-title">The entire price list. No hidden calls.</h2>
          <p>Pick a starting point. Every £150 quick fix is also an honest audition for the bigger £499 system.</p>
        </div>
        <div className="fit-list">
          {PRICES.map((item) => (
            <a href="#contact" key={item.label}>
              <strong>{item.label} — {item.price}</strong>
              <span>{item.detail}</span>
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
      </section>

      <section className="evidence-section" aria-labelledby="gaps-title">
        <div className="section-intro">
          <p className="section-label">Why it works</p>
          <h2 id="gaps-title">Three gaps every funded competitor leaves open.</h2>
          <p>Verified against live UK competitor research, not marketing copy.</p>
        </div>
        <dl className="evidence-matrix">
          {GAPS.map((gap) => (
            <div key={gap.title}>
              <dt>{gap.title}</dt>
              <dd>{gap.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="section-label">Shipped, not promised</p>
          <h2 id="work-title">Recent work for real businesses.</h2>
          <p>Proof that the £299/£499 ladder produces working systems, not just a landing page.</p>
        </div>

        {CASE_STUDIES.map((study) => (
          <article className="supporting-project" aria-labelledby={study.name} key={study.name}>
            <div>
              <p className="case-index">Delivered</p>
              <h3 id={study.name}>{study.name}</h3>
            </div>
            <div>
              <p className="supporting-lede">{study.result}</p>
            </div>
            <div className="project-links vertical">
              <a href={study.href}>View the work</a>
            </div>
          </article>
        ))}
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <p className="section-label">Free live demo. Real offer, no catch.</p>
        <h2 id="contact-title">Send the most annoying manual process in your business.</h2>
        <p>
          For suitable problems I will build a near-working demo around your actual workflow, then send the link or
          walk you through it live. You see the direction before spending a penny.
        </p>
        <form
          className="contact-actions"
          action="https://formsubmit.co/manazoid4@gmail.com"
          method="POST"
        >
          <input type="hidden" name="_subject" value="New Maz Works enquiry" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            className="button light"
            style={{ border: '1px solid currentColor', background: 'transparent', color: 'inherit' }}
            type="email"
            name="email"
            placeholder="Your email"
            required
            aria-label="Your email"
          />
          <button className="button light" type="submit">Send it</button>
        </form>
        <div className="contact-actions">
          <a className="button primary" href="mailto:manazoid4@gmail.com">Email instead</a>
        </div>
      </section>

      <footer className="site-footer">
        <span>Maz Works © 2026</span>
        <span>UK-based · Fixed-price websites, automation and AI systems</span>
        <a href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
      </footer>
    </main>
  );
}
