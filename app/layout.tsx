import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import './simplified.css';
import './credibility.css';
import { GITHUB_URL, PERSON_NAME, SITE_NAME, SITE_URL } from './site';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PERSON_NAME,
      jobTitle: 'Founder and Software Builder',
      url: `${SITE_URL}/`,
      address: { '@type': 'PostalAddress', addressCountry: 'GB' },
      sameAs: [GITHUB_URL],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME} — ${PERSON_NAME}`,
      about: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#maz-works`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      founder: { '@id': `${SITE_URL}/#person` },
      description: 'Web development, business automation and practical AI tools for UK small businesses.',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Maz Works | Web Development, Automation & AI', template: '%s — Maz Works' },
  description: 'Maz Works builds websites, business automations and practical AI-powered software for small businesses, from problem discovery through design, implementation and deployment.',
  alternates: { canonical: '/' },
  authors: [{ name: PERSON_NAME }],
  creator: PERSON_NAME,
  openGraph: {
    title: 'Maz Works | Web Development, Automation & AI',
    description: 'Websites, automation and AI tools built around real business problems.',
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    images: [{
      url: '/social-card.png', width: 1200, height: 630,
      alt: 'Maz Works by Manazir Hussain — websites, automation and AI tools',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maz Works | Web Development, Automation & AI',
    description: 'Websites, automation and AI tools built around real business problems.',
    images: ['/social-card.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
