import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mazos-site.vercel.app'),
  title: 'MAZos — the loop cockpit',
  description:
    'The control plane for AI agent loops: gate them before launch, verify them mechanically, and keep machine-filled receipts. Agents generate; MAZos keeps the score.',
  openGraph: {
    title: 'MAZos — the loop cockpit',
    description: 'Supervised AI agent loops with machine-verified receipts.',
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
