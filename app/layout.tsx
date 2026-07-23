import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: {
    default: 'Manazir Hussain | Software Builder, UK',
    template: '%s — Manazir Hussain',
  },
  description:
    'Manazir Hussain is a UK-based software builder open to roles, projects, and partnerships. Portfolio: JobFilter, Scrap Finance Partners, Agent Nudge, and OpenFlowKit.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Manazir Hussain' }],
  creator: 'Manazir Hussain',
  openGraph: {
    title: 'Manazir Hussain | Software Builder, UK',
    description: 'Useful automations and software built for real business problems — not generic AI hype.',
    type: 'website',
    url: '/',
    siteName: 'Manazir Hussain — Portfolio',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Manazir Hussain — UK-based software builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manazir Hussain | Software Builder, UK',
    description: 'Useful automations and software built for real business problems — not generic AI hype.',
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
