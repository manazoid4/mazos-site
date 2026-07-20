import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: 'Manazir Hussain — System Architect & Founder',
  description:
    'Portfolio: FlowLens, JobFilter, and MAZos — a control plane for supervised AI agent loops with machine-verified receipts.',
  openGraph: {
    title: 'Manazir Hussain — System Architect & Founder',
    description: 'FlowLens, JobFilter, MAZos, and the loop-engineering method behind them.',
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
