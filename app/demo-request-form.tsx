'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from './site';
import {
  DEFAULT_NEXT_STEP,
  DEFAULT_SERVICE_ID,
  ENQUIRY_NEXT_STEPS,
  ENQUIRY_SERVICES,
  buildRecoveryMailto,
  readServiceFromLocation,
  sendEnquiry,
  type EnquiryServiceId,
} from './enquiry';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

const FAILURE_COPY: Record<'rejected' | 'timeout' | 'network', string> = {
  rejected: 'That did not send.',
  timeout: 'That took too long to send.',
  network: 'That could not reach me — your connection may have dropped.',
};

export function DemoRequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [service, setService] = useState<EnquiryServiceId>(DEFAULT_SERVICE_ID);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [validationError, setValidationError] = useState('');
  const [failureReason, setFailureReason] = useState<'rejected' | 'timeout' | 'network'>('rejected');
  const [recoveryHref, setRecoveryHref] = useState(`mailto:${CONTACT_EMAIL}`);

  useEffect(() => {
    const requested = readServiceFromLocation();
    if (requested) setService(requested);
  }, []);

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
    const business = String(data.get('business') || '').trim();
    const problem = String(data.get('problem') || '').trim();
    const nextStep = String(data.get('nextStep') || DEFAULT_NEXT_STEP).trim();
    const honey = String(data.get('_honey') || '').trim();

    // Native `required` accepts whitespace, so re-check here and say what is missing
    // instead of silently doing nothing.
    const missing = !name ? 'name' : !email ? 'email' : !problem ? 'problem' : '';
    if (missing) {
      setValidationError(
        missing === 'problem'
          ? 'Add a short description of what you want to improve.'
          : `Add your ${missing} so I can reply.`,
      );
      focusField(missing);
      return;
    }

    setValidationError('');

    const serviceLabel = ENQUIRY_SERVICES.find((option) => option.id === service)?.label ?? 'Not specified';
    const subject = `Maz Works — enquiry${business ? ` — ${business}` : ''} — ${serviceLabel}`;

    setRecoveryHref(buildRecoveryMailto(subject, [
      ['Name', name],
      ['Business', business],
      ['Service', serviceLabel],
      ['What to improve', problem],
      ['Most useful next step', nextStep],
    ]));

    setSubmitState('sending');

    const result = await sendEnquiry({
      name,
      email,
      business: business || 'Not provided',
      service: serviceLabel,
      problem,
      next_step: nextStep,
      _replyto: email,
      _subject: subject,
      _template: 'table',
      _honey: honey,
      _url: window.location.href,
    });

    if (result.ok) {
      form.reset();
      setService(DEFAULT_SERVICE_ID);
      setSubmitState('sent');
      return;
    }

    setFailureReason(result.reason);
    setSubmitState('error');
  }

  return (
    <form className="mw-demo-form" ref={formRef} onSubmit={submitRequest}>
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
        <span>What do you need help with?</span>
        <select
          name="service"
          value={service}
          onChange={(event) => setService(event.target.value as EnquiryServiceId)}
          disabled={submitState === 'sending'}
        >
          {ENQUIRY_SERVICES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
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
        <span>What would be most useful next?</span>
        <select name="nextStep" defaultValue={DEFAULT_NEXT_STEP} disabled={submitState === 'sending'}>
          {ENQUIRY_NEXT_STEPS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <label className="mw-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mw-form-submit">
        <button className="button button-dark" type="submit" disabled={submitState === 'sending' || submitState === 'sent'}>
          {submitState === 'sending' ? 'Sending…' : submitState === 'sent' ? 'Sent' : 'Send enquiry'}
        </button>
        <p>Your enquiry is sent directly from this form. No account or booking system required.</p>
        <p className="mw-form-status mw-form-error" role="alert">{validationError}</p>
        <p className="mw-form-status" role="status" aria-live="polite">
          {submitState === 'sent' && (
            <>
              Enquiry sent. I’ll reply by email.{' '}
              <button type="button" className="text-link" onClick={() => setSubmitState('idle')}>Send another</button>
            </>
          )}
          {submitState === 'error' && (
            <>
              {FAILURE_COPY[failureReason]} Nothing you typed has been lost —{' '}
              <a href={recoveryHref}>send it by email instead</a> (everything is filled in for you), or email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
