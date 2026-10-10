'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { encodeConfig } from './engine.mjs';
import { PRESETS, presetConfig } from './presets.mjs';

type Config = NonNullable<ReturnType<typeof presetConfig>>;

const BOX_ID = 'vd-try';
const NAME_ID = 'vd-try-name';

/** Opens the form (it is folded away on phones) and puts the cursor in the first box. */
export function focusTryYours() {
  const box = document.getElementById(BOX_ID) as HTMLDetailsElement | null;
  if (!box) return;
  box.open = true;
  box.scrollIntoView({ block: 'center' });
  document.getElementById(NAME_ID)?.focus({ preventScroll: true });
}

/**
 * "Try it as your business": name + trade (+ hours) make a demo straight away.
 * Nothing is stored or sent. The details go into the link's #hash so the page can be shared.
 */
export function TryYours({ onMade }: { onMade: (config: Config) => void }) {
  const [error, setError] = useState('');
  const box = useRef<HTMLDetailsElement>(null);
  // Folded on phones so the call stays near the top; open on wide screens where there is room.
  useEffect(() => { if (box.current && window.matchMedia('(min-width: 900px)').matches) box.current.open = true; }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const config = presetConfig(String(data.get('name') ?? ''), String(data.get('type') ?? ''), String(data.get('hours') ?? ''));
    if (!config) { setError('Use just the business name, without a web address or phone number.'); return; }
    setError('');
    try { window.history.replaceState(null, '', `#c=${encodeConfig(config)}`); } catch { /* the demo still works without a shareable link */ }
    onMade(config);
  };

  return (
    <details className="vd-try" id={BOX_ID} ref={box}>
      <summary>Try it as your business</summary>
      <form onSubmit={submit}>
        <label>Business name
          <input id={NAME_ID} name="name" required maxLength={40} autoComplete="organization" aria-describedby={error ? 'vd-try-err' : undefined} aria-invalid={error ? true : undefined} />
        </label>
        <label>Type of business
          <select name="type" defaultValue={PRESETS[0].id}>
            {PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
          </select>
        </label>
        <label>Opening hours (optional)
          <input name="hours" maxLength={80} placeholder="e.g. Monday to Friday 8am to 6pm" />
        </label>
        {error ? <p id="vd-try-err" role="alert" className="vd-try-err">{error}</p> : null}
        <button type="submit" className="button vd-try-go">Make my demo</button>
      </form>
    </details>
  );
}
