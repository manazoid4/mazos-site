'use client';

import { useMemo, useState } from 'react';
import { cleanConfig, encodeConfig } from '../engine.mjs';

/**
 * One service per line: "MOT, from £45" or just "Brakes".
 * Prices are only what the business itself publishes; leave blank if unsure
 * (the demo then says it won't guess and takes a message).
 */
function parseServices(text: string) {
  return text.split('\n').map((line) => {
    const [name, ...rest] = line.split(',');
    return { name: (name ?? '').trim(), price: rest.join(',').trim() || undefined };
  }).filter((service) => service.name);
}

export function DemoMaker() {
  const [form, setForm] = useState({ name: '', hours: '', services: '', areas: '', urgent: '', callback: 'on the next working day' });
  const [copied, setCopied] = useState(false);
  const set = (key: keyof typeof form) => (event: { target: { value: string } }) => { setForm({ ...form, [key]: event.target.value }); setCopied(false); };

  const link = useMemo(() => {
    if (!form.name.trim()) return '';
    const config = cleanConfig({
      name: form.name,
      hours: form.hours,
      services: parseServices(form.services),
      areas: form.areas,
      urgent: form.urgent.split(',').map((word) => word.trim()).filter(Boolean),
      callback: form.callback,
    });
    const origin = typeof window === 'undefined' ? 'https://www.mazworks.uk' : window.location.origin;
    return `${origin}/receptionist-demo#c=${encodeConfig(config)}`;
  }, [form]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); setCopied(true); } catch { setCopied(false); }
  };

  return (
    <div className="vm">
      <label><span>Business name</span><input value={form.name} onChange={set('name')} placeholder="Harbour Street Garage" /></label>
      <label><span>Opening hours, as you’d say them</span><input value={form.hours} onChange={set('hours')} placeholder="Monday to Friday 8am to 6pm, and Saturday 8am to 12 noon" /></label>
      <label><span>Services, one per line. Add a price only if they publish it.</span><textarea rows={6} value={form.services} onChange={set('services')} placeholder={'MOT, from …\nService\nTyres\nBrakes'} /></label>
      <label><span>Areas covered (optional)</span><input value={form.areas} onChange={set('areas')} placeholder="the town and villages within about 10 miles" /></label>
      <label><span>Urgent words, comma separated</span><input value={form.urgent} onChange={set('urgent')} placeholder="leak, no heating, broken down" /></label>
      <label><span>When the team calls back</span><input value={form.callback} onChange={set('callback')} /></label>
      <div className="vm-out">
        {link ? (
          <>
            <p className="vm-link">{link}</p>
            <div className="mw-actions">
              <button type="button" className="button button-signal" onClick={copy}>{copied ? 'Copied' : 'Copy link'}</button>
              <a className="button" href={link} target="_blank" rel="noopener">Try it</a>
            </div>
          </>
        ) : <p>Add a business name to make the link.</p>}
      </div>
    </div>
  );
}
