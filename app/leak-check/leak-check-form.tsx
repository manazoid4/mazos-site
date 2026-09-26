'use client';

import { useRef, useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '../site';
import { EnquiryRecovery } from '../enquiry-recovery';
import { NATIVE_FORM_ENDPOINT, buildRecoveryMailto, sendEnquiry } from '../enquiry';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';
type FailureReason = 'rejected' | 'timeout' | 'network';

const FAILURE_COPY: Record<FailureReason, string> = {
  rejected: 'Delivery was not confirmed.',
  timeout: 'That took too long to send.',
  network: 'That could not reach me — your connection may have dropped.',
};

const SERVICE_LABEL = 'Free Leak Check: review my website';

export function LeakCheckForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [validationError, setValidationError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [failureReason, setFailureReason] = useState<FailureReason>('rejected');
  const [recoveryHref, setRecoveryHref] = useState(`mailto:${CONTACT_EMAIL}`);

  function focusField(name: string) {
    formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const website = String(data.get('website') || '').trim();
    const honey = String(data.get('_honey') || '').trim();
    const source = new URLSearchParams(window.location.search).get('src')?.trim() || 'direct';

    const missing = !name ? 'name' : !email ? 'email' : !website ? 'website' : '';
    if (missing) {
      setInvalidField(missing);
      setValidationError(
        missing === 'website'
          ? 'Add the website you want me to check.'
          : `Add your ${missing} so I can reply.`,
      );
      focusField(missing);
      return;
    }

    setValidationError('');
    setInvalidField('');

    const subject = `Maz Works — free Leak Check — ${website}`;
    setRecoveryHref(buildRecoveryMailto(subject, [
      ['Name', name],
      ['Email', email],
      ['Website', website],
      ['Source', source],
    ]));

    setSubmitState('sending');

    const result = await sendEnquiry({
      name,
      email,
      website,
      service: SERVICE_LABEL,
      problem: `Please review ${website} for customer-facing leaks and friction.`,
      next_step: 'Email me the free Leak Check',
      source,
      _replyto: email,
      _subject: subject,
      _template: 'table',
      _honey: honey,
      _url: window.location.href,
    });

    if (result.ok) {
      form.reset();
      setSubmitState('sent');
      return;
    }

    setFailureReason(result.reason);
    setSubmitState('error');
  }

  return (
    <form
      className="mw-demo-form"
      id="leak-check-form"
      action={NATIVE_FORM_ENDPOINT}
      method="post"
      ref={formRef}
      onSubmit={submitRequest}
      onInput={(event) => {
        if ((event.target as HTMLInputElement).name === invalidField) {
          setInvalidField('');
          setValidationError('');
        }
      }}
    >
      <input type="hidden" name="_subject" value="Maz Works — free Leak Check" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="service" value={SERVICE_LABEL} />
      <p className="mw-form-kicker">Three fields. No call required.</p>

      <div className="mw-form-row">
        <label>
          <span>Name</span>
          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={invalidField === 'name' || undefined}
            aria-describedby={invalidField === 'name' ? 'leak-check-error' : undefined}
            disabled={submitState === 'sending'}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={invalidField === 'email' || undefined}
            aria-describedby={invalidField === 'email' ? 'leak-check-error' : undefined}
            disabled={submitState === 'sending'}
          />
        </label>
      </div>

      <label>
        <span>Website link</span>
        <input
          name="website"
          inputMode="url"
          autoComplete="url"
          required
          placeholder="yourbusiness.co.uk"
          aria-invalid={invalidField === 'website' || undefined}
          aria-describedby={invalidField === 'website' ? 'leak-check-error' : undefined}
          disabled={submitState === 'sending'}
        />
      </label>

      <label className="mw-honeypot" aria-hidden="true">
        <span>Company website</span>
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mw-form-submit">
        <button className="button button-dark" type="submit" disabled={submitState === 'sending' || submitState === 'sent'}>
          {submitState === 'sending' ? 'Sending…' : submitState === 'sent' ? 'Sent' : 'Get my free Leak Check'}
        </button>
        <p>I’ll check it myself and reply by email within 5 working days.</p>
        <p id="leak-check-error" className="mw-form-status mw-form-error" role="alert">{validationError}</p>
        <p className="mw-form-status" role="status" aria-live="polite">
          {submitState === 'sent' && (
            <>
              Request sent. I’ll reply within 5 working days.{' '}
              <button type="button" className="text-link" onClick={() => { setSubmitState('idle'); focusField('name'); }}>Send another</button>
            </>
          )}
          {submitState === 'error' && (
            <>
              {FAILURE_COPY[failureReason]} Nothing you typed has been lost —{' '}
              <a href={recoveryHref}>send it by email instead</a>, or email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </>
          )}
        </p>
        {submitState === 'error' && <EnquiryRecovery href={recoveryHref} />}
      </div>
    </form>
  );
}
