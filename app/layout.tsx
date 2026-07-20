import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: 'Manazir Hussain — Product Engineer',
  description:
    'Portfolio of full-stack TypeScript products spanning opportunity intelligence, agent coordination, voice tooling, and personal data systems.',
  openGraph: {
    title: 'Manazir Hussain — Product Engineer',
    description: 'JobFilter and selected full-stack product engineering case studies.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
