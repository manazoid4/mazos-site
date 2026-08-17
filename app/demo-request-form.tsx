'use client';

import type { FormEvent } from 'react';
import { CONTACT_EMAIL } from './site';

export function DemoRequestForm() {
  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const business = String(data.get('business') || '').trim();
    const problem = String(data.get('problem') || '').trim();
    const demoPreference = String(data.get('demoPreference') || 'Either is fine').trim();

    const subject = `Maz Works — live demo request${business ? ` — ${business}` : ''}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      business ? `Business: ${business}` : null,
      `Demo preference: ${demoPreference}`,
      '',
      'What I want to improve:',
      problem,
    ].filter((line): line is string => line !== null).join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="mw-demo-form" onSubmit={submitRequest}>
      <div className="mw-form-row">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        <span>Business <small>optional</small></span>
        <input name="business" autoComplete="organization" />
      </label>

      <label>
        <span>What do you want to improve?</span>
        <textarea
          name="problem"
          rows={5}
          required
          placeholder="For example: we lose enquiries, spend hours copying information, or want a better website and follow-up process."
        />
      </label>

      <label>
        <span>How would you like to see the demo?</span>
        <select name="demoPreference" defaultValue="Either is fine">
          <option>Send me a live demo link</option>
          <option>Microsoft Teams walkthrough</option>
          <option>Either is fine</option>
        </select>
      </label>

      <div className="mw-form-submit">
        <button className="button button-dark" type="submit">Send demo request</button>
        <p>No account or booking system. This opens a ready-to-send email with your details filled in.</p>
      </div>
    </form>
  );
}
