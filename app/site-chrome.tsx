import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './site';

export function SiteHeader() {
  return (
    <header className="site-header mw-site-header">
      <a className="brand" href="/" aria-label="Maz Works home">
        <span className="brand-mark">MW</span>
        <span><strong>Maz Works</strong><small>Manazir Hussain</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a className="mw-nav-optional" href="/#example">Example</a>
        <a href="/#pricing">Prices</a>
        <a className="mw-nav-cta" href="/leak-check">Free quote</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer mw-site-footer mw-footer-clean">
      <div className="mw-footer-brand">
        <strong>Maz Works</strong>
        <span>Automation, connected tools and custom software for UK small businesses, by Manazir Hussain.</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>

      <nav className="mw-footer-links" aria-label="Maz Works links">
        <a href="/leak-check">Free plan and quote</a>
        <a href="/#pricing">Prices</a>
        <a href="/#example">Example plan</a>
        <a href="/contact">Bigger jobs</a>
        <a href="/lab">Other builds</a>
        <a href="/3d-printing">Objects</a>
        <a href="/demos">Private demos</a>
        <a href="/faq">FAQ</a>
        <a href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20feedback`}>Feedback</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>

      <div className="mw-footer-bottom">
        <span>© 2026 Maz Works</span>
        <span>Fixed quotes · No VAT added · Delivery guarantee</span>
      </div>
    </footer>
  );
}
