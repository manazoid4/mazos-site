'use client';

import { useEffect, useState, type FormEvent } from 'react';

type State = 'idle' | 'sending' | 'done' | 'error';

/**
 * One-field mailing-list signup. Posts to `/api/subscribe`, which forwards to
 * HubSpot. Without JavaScript the same form does a normal POST and the server
 * redirects back with `?subscribed=1` or `0`, which is read here on load.
 */
export function NewsletterSignup() {
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const outcome = new URLSearchParams(window.location.search).get('subscribed');
    if (outcome === '1') setState('done');
    if (outcome === '0') {
      setState('error');
      setMessage('That didn’t go through. Please try again.');
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    if (!email || !form.checkValidity()) {
      setState('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setState('sending');
    setMessage('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ email, website: (form.elements.namedItem('website') as HTMLInputElement).value }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; reason?: string } | null;
      if (result?.ok === true) {
        setState('done');
        return;
      }
      setState('error');
      setMessage(result?.reason === 'invalid-email' ? 'Please enter a valid email address.' : 'That didn’t go through. Please try again.');
    } catch {
      setState('error');
      setMessage('That didn’t go through. Please try again.');
    }
  }

  return (
    <section className="mw-newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="mw-newsletter-copy">
        <h2 id="newsletter-title">Not ready yet?</h2>
        <p>Occasional updates on what I build. Unsubscribe any time.</p>
      </div>
      {state === 'done' ? (
        <p className="mw-newsletter-done" role="status">You’re on the list. Thanks.</p>
      ) : (
        <form className="mw-newsletter-form" method="post" action="/api/subscribe" onSubmit={onSubmit} noValidate>
          <div className="mw-newsletter-row">
            <input id="newsletter-email" aria-label="Email address" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@business.co.uk" aria-describedby={message ? 'newsletter-message' : undefined} />
            <button className="button" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Joining…' : 'Join'}</button>
          </div>
          {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
          <input className="mw-newsletter-trap" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {message ? <p className="mw-newsletter-error" id="newsletter-message" role="alert">{message}</p> : null}
        </form>
      )}
    </section>
  );
}
