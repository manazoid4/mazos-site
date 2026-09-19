import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './site';

export function SiteHeader() {
  return (
    <header className="site-header mw-site-header">
      <a className="brand" href="/" aria-label="Maz Works home">
        <span className="brand-mark">MW</span>
        <span><strong>Maz Works</strong><small>Manazir Hussain</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#services">Services</a>
        <a href="/#work">Work</a>
        <a className="mw-nav-objects" href="/3d-printing">Objects</a>
        <a className="mw-nav-cta" href="/#contact">Contact</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer mw-site-footer">
      <div><strong>Maz Works</strong><span>Websites, automations, tools and physical products that fix real business bottlenecks.</span></div>
      <div><span>Manazir Hussain / UK</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
      <div>
        <a href="/demos">Private demos <span aria-hidden="true">→</span></a>
        <a href="/3d-printing">Maz Works Objects <span aria-hidden="true">→</span></a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
