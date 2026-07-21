import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: {
    default: 'Manazir Hussain | Junior Applied AI Engineer',
    template: '%s — Manazir Hussain',
  },
  description:
    'Portfolio of Manazir Hussain, a UK junior applied AI engineer building agent infrastructure, public-data pipelines, tool integrations, and production TypeScript software.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Manazir Hussain' }],
  creator: 'Manazir Hussain',
  openGraph: {
    title: 'Manazir Hussain | Junior Applied AI Engineer',
    description: 'Dependable software around AI agents and data: infrastructure, pipelines, tool integrations, and production safeguards.',
    type: 'website',
    url: '/',
    siteName: 'Manazir Hussain — Applied AI Engineering Portfolio',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Manazir Hussain — junior applied AI engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manazir Hussain | Junior Applied AI Engineer',
    description: 'Dependable software around AI agents and data: infrastructure, pipelines, tool integrations, and production safeguards.',
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
