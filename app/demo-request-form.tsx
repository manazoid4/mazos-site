'use client';

import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from './site';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function DemoRequestForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const business = String(data.get('business') || '').trim();
    const problem = String(data.get('problem') || '').trim();
    const demoPreference = String(data.get('demoPreference') || 'Either is fine').trim();
    const honey = String(data.get('_honey') || '').trim();

    if (!name || !email || !problem) return;

    setSubmitState('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          business: business || 'Not provided',
          problem,
          demo_preference: demoPreference,
          _replyto: email,
          _subject: `Maz Works — live demo request${business ? ` — ${business}` : ''}`,
          _template: 'table',
          _honey: honey,
          _url: window.location.href,
        }),
      });

      const payload = await response.json().catch(() => null) as { success?: boolean | string; message?: string } | null;
      const rejected = payload?.success === false || payload?.success === 'false';

      if (!response.ok || rejected) {
        throw new Error(payload?.message || 'Unable to send demo request');
      }

      form.reset();
      setSubmitState('sent');
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <form className="mw-demo-form" onSubmit={submitRequest}>
      <div className="mw-form-row">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required disabled={submitState === 'sending'} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required disabled={submitState === 'sending'} />
        </label>
      </div>

      <label>
        <span>Business <small>optional</small></span>
        <input name="business" autoComplete="organization" disabled={submitState === 'sending'} />
      </label>

      <label>
        <span>What do you want to improve?</span>
        <textarea
          name="problem"
          rows={5}
          required
          disabled={submitState === 'sending'}
          placeholder="For example: reduce admin hours, respond to leads faster, improve follow-up, or make the team more productive."
        />
      </label>

      <label>
        <span>How would you like to see the demo?</span>
        <select name="demoPreference" defaultValue="Either is fine" disabled={submitState === 'sending'}>
          <option>Send me a live demo link</option>
          <option>Microsoft Teams walkthrough</option>
          <option>Either is fine</option>
        </select>
      </label>

      <label className="mw-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mw-form-submit">
        <button className="button button-dark" type="submit" disabled={submitState === 'sending'}>
          {submitState === 'sending' ? 'Sending…' : 'Send demo request'}
        </button>
        <p>Your request is sent directly from this form. No account or booking system required.</p>
        <p className="mw-form-status" role="status" aria-live="polite">
          {submitState === 'sent' && 'Request sent. I’ll reply by email to arrange the demo or Teams walkthrough.'}
          {submitState === 'error' && <>That did not send. Please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}
        </p>
      </div>
    </form>
  );
}
