import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://mazos-site.vercel.app/#person',
      name: 'Manazir Hussain',
      jobTitle: 'Software Builder',
      url: 'https://mazos-site.vercel.app/',
      address: { '@type': 'PostalAddress', addressCountry: 'GB' },
      sameAs: ['https://github.com/manazoid4'],
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://mazos-site.vercel.app/#website',
      url: 'https://mazos-site.vercel.app/',
      name: 'Maz Works — Manazir Hussain',
      about: { '@id': 'https://mazos-site.vercel.app/#person' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://mazos-site.vercel.app/#maz-works',
      name: 'Maz Works',
      url: 'https://mazos-site.vercel.app/',
      founder: { '@id': 'https://mazos-site.vercel.app/#person' },
      description: 'Useful software, AI tools and automation around real problems.',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: { default: 'Maz Works | Manazir Hussain', template: '%s — Maz Works' },
  description: 'Manazir Hussain builds useful software, AI tools and automation around real problems. Explore Maz Works products, client work and practical experiments.',
  alternates: { canonical: '/' },
  authors: [{ name: 'Manazir Hussain' }],
  creator: 'Manazir Hussain',
  openGraph: {
    title: 'Maz Works | Manazir Hussain',
    description: 'Useful software, AI tools and automation around real problems.',
    type: 'website',
    url: '/',
    siteName: 'Maz Works',
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
