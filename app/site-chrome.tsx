import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './site';

export function SiteHeader() {
  return (
    <header className="site-header mw-site-header">
      <a className="brand" href="/" aria-label="Maz Works home">
        <span className="brand-mark">MW</span>
        <span><strong>Maz Works</strong><small>Manazir Hussain</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#work">Work</a>
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a className="mw-nav-cta" href="/#contact">Contact</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer mw-site-footer mw-footer-expanded">
      <div className="mw-footer-brand">
        <strong>Maz Works</strong>
        <span>Websites, automations, tools and physical products that fix real business bottlenecks.</span>
        <span>Built by Manazir Hussain / UK</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>

      <nav className="mw-footer-group" aria-label="Explore Maz Works">
        <strong>Explore</strong>
        <a href="/#work">Work</a>
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/3d-printing">Maz Works Objects</a>
        <a href="/demos">Private demos</a>
      </nav>

      <nav className="mw-footer-group" aria-label="Maz Works company links">
        <strong>Company</strong>
        <a href="/faq">FAQ</a>
        <a href="/whats-new">What&apos;s New</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </nav>

      <div className="mw-footer-bottom">
        <span>© 2026 Maz Works</span>
        <span>Direct with the builder · fixed scope first · no invented results</span>
      </div>
    </footer>
  );
}
