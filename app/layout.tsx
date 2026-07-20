import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAZos — the loop cockpit',
  description:
    'An operating console where a solo founder turns "what ships next" into supervised AI agent loops with machine-verified receipts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
