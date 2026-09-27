import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import './simplified.css';
import './credibility.css';
import './final-friction.css';
import './enquiry.css';
import './resource-pages.css';
import './clean-pass.css';
import './mazworks-friction-pass.css';
import './sales.css';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, PERSON_NAME, SITE_NAME, SITE_URL } from './site';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE } from './seo';

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
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME} — ${PERSON_NAME}`,
      about: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#maz-works`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      email: CONTACT_EMAIL,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      logo: `${SITE_URL}/email/mw-logo.png`,
      founder: { '@id': `${SITE_URL}/#person` },
      address: { '@type': 'PostalAddress', addressCountry: 'GB' },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      priceRange: '£249–£595',
      description: 'Booking, enquiry and Google Business Profile repairs for UK small businesses, at fixed prices. Also websites, rebuilds, customer-growth systems, automation, software and physical products.',
      makesOffer: [
        { '@type': 'Offer', name: 'Free Booking & Enquiry Check', price: '0', priceCurrency: 'GBP', url: `${SITE_URL}/leak-check` },
        { '@type': 'Offer', name: 'Booking & Enquiry Repair', price: '395', priceCurrency: 'GBP', url: `${SITE_URL}/#pricing` },
        { '@type': 'Offer', name: 'Google Profile & Contact Setup', price: '249', priceCurrency: 'GBP', url: `${SITE_URL}/#pricing` },
        { '@type': 'Offer', name: 'Booking & Enquiry Repair and Google Setup', price: '595', priceCurrency: 'GBP', url: `${SITE_URL}/#pricing` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s — Maz Works' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  authors: [{ name: PERSON_NAME }],
  creator: PERSON_NAME,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_GB',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
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
