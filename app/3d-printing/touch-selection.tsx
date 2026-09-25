'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { INTENDED_USES, TOUCH_PRICING, getTouchBundle, getTouchEstimate, type IntendedUseId, type TouchBundleId } from './touch-config';

type SelectionContextValue = {
  interactive: boolean;
  submitState: 'idle' | 'sending' | 'sent' | 'error';
  setSubmitState: (value: SelectionContextValue['submitState']) => void;
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
  const [interactive, setInteractive] = useState(false);
  const [submitState, setSubmitState] = useState<SelectionContextValue['submitState']>('idle');
  const [bundleId, selectBundle] = useState<TouchBundleId>('touch-three');
  const [artwork, setArtwork] = useState(false);
  const [intendedUses, setIntendedUses] = useState<IntendedUseId[]>(['website']);
  const [businessName, setBusinessName] = useState('');
  useEffect(() => {
    // A visitor can use the native form before the scripts finish loading.
    // Adopt those choices before the first interactive render can reset them.
    const form = document.querySelector<HTMLFormElement>('.objects-form');
    if (form) {
      const data = new FormData(form);
      const selectedBundle = TOUCH_PRICING.bundles.find((bundle) => bundle.id === data.get('bundle'));
      if (selectedBundle) selectBundle(selectedBundle.id);
      setArtwork(data.get('artwork') === 'yes');
      setBusinessName(String(data.get('businessName') ?? ''));
      setIntendedUses(INTENDED_USES.filter((use) => data.has(`customer_action_${use.id}`)).map((use) => use.id));
    }
    setInteractive(true);
  }, []);

  const value = useMemo<SelectionContextValue>(() => ({
    interactive,
    submitState,
    setSubmitState,
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
  }), [interactive, submitState, artwork, businessName, bundleId, intendedUses]);

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
