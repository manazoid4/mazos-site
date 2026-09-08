import { Fredoka } from 'next/font/google';
import './objects.css';
import './objects-responsive.css';

const objectsDisplay = Fredoka({
  subsets: ['latin'],
  variable: '--objects-display',
  display: 'swap',
});

export default function ObjectsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${objectsDisplay.variable} objects-scope`}>{children}</div>;
}
