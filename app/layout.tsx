import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { GITHUB_URL, PERSON_NAME, SITE_NAME, SITE_URL } from './site';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PERSON_NAME,
      jobTitle: 'Software Builder',
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
      description: 'Useful software, AI tools and automation around real problems.',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Maz Works | Manazir Hussain', template: '%s — Maz Works' },
  description: 'Manazir Hussain builds useful software, AI tools and automation around real problems. Explore Maz Works products, client work and practical experiments.',
  alternates: { canonical: '/' },
  authors: [{ name: PERSON_NAME }],
  creator: PERSON_NAME,
  openGraph: {
    title: 'Maz Works | Manazir Hussain',
    description: 'Useful software, AI tools and automation around real problems.',
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    images: [{
      url: '/social-card.png', width: 1200, height: 630,
      alt: 'Maz Works by Manazir Hussain — useful software around real problems',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maz Works | Manazir Hussain',
    description: 'Useful software, AI tools and automation around real problems.',
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