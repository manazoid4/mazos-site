import { CONTACT_EMAIL, GITHUB_URL } from './site';

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Maz Works home">
        <span className="brand-mark">MW</span>
        <span><strong>Maz Works</strong><small>Manazir Hussain</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
        <a href="/#client">Client</a>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><strong>Maz Works</strong><span>Useful systems around real problems.</span></div>
      <div><span>Manazir Hussain / Birmingham, UK</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
      <div><a href={GITHUB_URL}>GitHub <span aria-hidden="true">↗</span></a><span>© 2026</span></div>
    </footer>
  );
}
