import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case study moved',
  description: 'Agent-delivery evidence has moved into the main engineering portfolio.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <Link className="nameplate" href="/">Manazir Hussain</Link>
        <nav aria-label="Page navigation">
          <Link href="/#work">Projects</Link>
          <Link href="/#evidence">Evidence</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="moved-page" id="main-content" tabIndex={-1} aria-labelledby="moved-title">
        <p className="identity">Portfolio update</p>
        <h1 id="moved-title">This case study has moved.</h1>
        <p className="hero-copy">
          The useful evidence—agent controls, verification gates, and delivery receipts—is now described by outcome
          inside the main portfolio instead of requiring a separate internal product name.
        </p>
        <Link className="button primary" href="/#work">View the applied-AI portfolio</Link>
      </section>
    </main>
  );
}
