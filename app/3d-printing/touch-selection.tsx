'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { getTouchBundle, getTouchEstimate, type IntendedUseId, type TouchBundleId } from './touch-config';

type SelectionContextValue = {
  artwork: boolean;
  businessName: string;
  bundleId: TouchBundleId;
  estimate: number;
  intendedUses: IntendedUseId[];
  selectBundle: (id: TouchBundleId) => void;
  setArtwork: (value: boolean) => void;
  setBusinessName: (value: string) => void;
  toggleIntendedUse: (id: IntendedUseId) => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function TouchSelectionProvider({ children }: { children: ReactNode }) {
  const [bundleId, selectBundle] = useState<TouchBundleId>('touch-three');
  const [artwork, setArtwork] = useState(false);
  const [intendedUses, setIntendedUses] = useState<IntendedUseId[]>(['website']);
  const [businessName, setBusinessName] = useState('');

  const value = useMemo<SelectionContextValue>(() => ({
    artwork,
    businessName,
    bundleId,
    estimate: getTouchEstimate(bundleId, artwork),
    intendedUses,
    selectBundle,
    setArtwork,
    setBusinessName,
    toggleIntendedUse(id) {
      setIntendedUses((current) => current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]);
    },
  }), [artwork, businessName, bundleId, intendedUses]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useTouchSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('useTouchSelection must be used inside TouchSelectionProvider');
  return context;
}

export function useSelectedTouchBundle() {
  const selection = useTouchSelection();
  return { ...selection, bundle: getTouchBundle(selection.bundleId) };
}
