import { NAV_GROUPS, PRIMARY_NAV } from './nav';
import { SiteMenu } from './site-menu';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './site';

export function SiteHeader() {
  return (
    <header className="site-header mw-site-header">
      <a className="brand" href="/" aria-label="Maz Works home">
        <span className="brand-mark">MW</span>
        <span><strong>Maz Works</strong><small>Manazir Hussain</small></span>
      </a>
      <nav aria-label="Primary navigation">
        {PRIMARY_NAV.map((link) => <a key={link.href} className="mw-nav-link" href={link.href}>{link.label}</a>)}
        <SiteMenu />
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

      <div className="mw-footer-groups">
        {NAV_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p>{group.title}</p>
            {group.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
        ))}
        <nav aria-label="Get started">
          <p>Get started</p>
          <a href="/leak-check">Free plan and quote</a>
          <a href="/demos">Private demos</a>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20feedback`}>Feedback</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </div>

      <div className="mw-footer-bottom">
        <span>© 2026 Maz Works</span>
        <span>Fixed quotes · No VAT added · Delivery guarantee</span>
      </div>
    </footer>
  );
}
