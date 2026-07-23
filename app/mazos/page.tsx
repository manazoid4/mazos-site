import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page moved',
  description: 'The MAZos concept page has moved into the main portfolio.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <Link className="nameplate" href="/">Manazir Hussain</Link>
        <nav aria-label="Page navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#build">What I build</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="moved-page" id="main-content" tabIndex={-1} aria-labelledby="moved-title">
        <p className="identity">Portfolio update</p>
        <h1 id="moved-title">This page has moved.</h1>
        <p className="hero-copy">
          The MAZos concept is no longer a separate page. The shipped projects it used to describe now live in the
          main portfolio, described by outcome.
        </p>
        <Link className="button primary" href="/#work">View the portfolio</Link>
      </section>
    </main>
  );
}
