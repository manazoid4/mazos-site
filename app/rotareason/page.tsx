import type { Metadata } from 'next';
import RotaReasonClient from './RotaReasonClient';

export const metadata: Metadata = {
  title: 'RotaReason — Explainable staff scheduling',
  description:
    'A working RotaReason v1 demo: ask for rota changes in plain English, check staffing constraints, and preview safe schedule changes before applying them.',
  alternates: { canonical: '/rotareason' },
};

export default function RotaReasonPage() {
  return <RotaReasonClient />;
}
