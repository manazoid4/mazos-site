import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: {
    default: 'Maz Works | Fixed-price websites & automation',
    template: '%s — Maz Works',
  },
  description:
    'Fixed-price websites, automation and AI systems for UK small businesses. Free live demo before you pay.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Maz Works' }],
  creator: 'Maz Works',
  openGraph: {
    title: 'Maz Works | Fixed-price websites & automation',
    description: '£299 fixed, your rebuilt page working live on this call, done in days, no contract.',
    type: 'website',
    url: '/',
    siteName: 'Maz Works',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Maz Works — fixed-price websites, automation and AI systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maz Works | Fixed-price websites & automation',
    description: '£299 fixed, your rebuilt page working live on this call, done in days, no contract.',
    images: ['/social-card.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
