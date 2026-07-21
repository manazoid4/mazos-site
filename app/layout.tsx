import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: {
    default: 'Manazir Hussain — Applied-AI Product Engineer',
    template: '%s — Manazir Hussain',
  },
  description:
    'Operational B2B and applied-AI product engineering: full-stack TypeScript systems, agent coordination, data workflows, and verifiable delivery.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Manazir Hussain' }],
  creator: 'Manazir Hussain',
  openGraph: {
    title: 'Manazir Hussain — Applied-AI Product Engineer',
    description: 'Operational B2B software, agent coordination, and full-stack TypeScript delivery evidence.',
    type: 'website',
    url: '/',
    siteName: 'Manazir Hussain — Engineering Portfolio',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Manazir Hussain — operational B2B and applied-AI product engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manazir Hussain — Applied-AI Product Engineer',
    description: 'Operational B2B software, agent coordination, and full-stack TypeScript delivery evidence.',
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
