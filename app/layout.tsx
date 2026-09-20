import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import './simplified.css';
import './credibility.css';
import './final-friction.css';
import './enquiry.css';
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
      description: 'Websites, software, automation and useful physical products for UK small businesses, built by Manazir Hussain around practical business problems.',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Maz Works | Websites, Software & Useful Business Products', template: '%s — Maz Works' },
  description: 'Websites, software, automation and useful physical products for small businesses. Connect a tap stand to a booking page, improve enquiries or cut repetitive admin.',
  alternates: { canonical: '/' },
  authors: [{ name: PERSON_NAME }],
  creator: PERSON_NAME,
  openGraph: {
    title: 'Maz Works | Websites, Software & Useful Business Products',
    description: 'Websites, software, automation and physical products built around real business problems. Work directly with Manazir Hussain.',
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
    title: 'Maz Works | Websites, Software & Useful Business Products',
    description: 'Websites, software, automation and physical products built around real business problems. Work directly with Manazir Hussain.',
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
