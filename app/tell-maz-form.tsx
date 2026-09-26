'use client';

import { useRef, useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from './site';
import { EnquiryRecovery } from './enquiry-recovery';
import { NATIVE_FORM_ENDPOINT, buildRecoveryMailto, sendEnquiry } from './enquiry';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';
type FailureReason = 'rejected' | 'timeout' | 'network';

const FAILURE_COPY: Record<FailureReason, string> = {
  rejected: 'Delivery was not confirmed.',
  timeout: 'That took too long to send.',
  network: 'That could not reach me — your connection may have dropped.',
};

const SERVICE_LABEL = 'Booking & Enquiry Repair (£395)';

/**
 * A direct route for owners who already know something is wrong, rather than
 * making them describe the problem from scratch in the general enquiry form.
 */
export function TellMazForm() {
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
    const website = String(data.get('website') || '').trim();
    const action = String(data.get('action') || '').trim();
    const instead = String(data.get('instead') || '').trim();
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const screenshot = String(data.get('screenshot') || '').trim();
    const honey = String(data.get('_honey') || '').trim();

    const missing = !website ? 'website' : !action ? 'action' : !instead ? 'instead' : !name ? 'name' : !email ? 'email' : '';
    if (missing) {
      setInvalidField(missing);
      setValidationError(
        missing === 'website' ? 'Add the website you want checked.'
          : missing === 'action' ? 'Say what a customer is trying to do.'
          : missing === 'instead' ? 'Say what happens instead.'
          : `Add your ${missing} so I can reply.`,
      );
      focusField(missing);
      return;
    }

    setValidationError('');
    setInvalidField('');

    const subject = `Maz Works — something's broken — ${website}`;
    setRecoveryHref(buildRecoveryMailto(subject, [
      ['Name', name],
      ['Email', email],
      ['Website', website],
      ['Customer tries to', action],
      ['What happens instead', instead],
      ['Screenshot', screenshot || 'Not provided'],
    ]));

    setSubmitState('sending');

    const result = await sendEnquiry({
      name,
      email,
      website,
      service: SERVICE_LABEL,
      problem: `Customer tries to: ${action}. What happens instead: ${instead}.`,
      screenshot: screenshot || 'Not provided',
      next_step: 'Confirm the repair and price before any work',
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
      id="tell-maz-form"
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
      <input type="hidden" name="_subject" value="Maz Works — something's broken" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="service" value={SERVICE_LABEL} />
      <p className="mw-form-kicker">Four short fields. No call required.</p>

      <label>
        <span>Website link</span>
        <input
          name="website"
          inputMode="url"
          autoComplete="url"
          required
          placeholder="yourbusiness.co.uk"
          aria-invalid={invalidField === 'website' || undefined}
          aria-describedby={invalidField === 'website' ? 'tell-maz-error' : undefined}
          disabled={submitState === 'sending'}
        />
      </label>

      <label>
        <span>What is a customer trying to do?</span>
        <input
          name="action"
          required
          placeholder="Book an appointment, ask a question, get a quote…"
          aria-invalid={invalidField === 'action' || undefined}
          aria-describedby={invalidField === 'action' ? 'tell-maz-error' : undefined}
          disabled={submitState === 'sending'}
        />
      </label>

      <label>
        <span>What happens instead?</span>
        <input
          name="instead"
          required
          placeholder="The button opens the wrong page, nobody replies…"
          aria-invalid={invalidField === 'instead' || undefined}
          aria-describedby={invalidField === 'instead' ? 'tell-maz-error' : undefined}
          disabled={submitState === 'sending'}
        />
      </label>

      <div className="mw-form-row">
        <label>
          <span>Name</span>
          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={invalidField === 'name' || undefined}
            aria-describedby={invalidField === 'name' ? 'tell-maz-error' : undefined}
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
            aria-describedby={invalidField === 'email' ? 'tell-maz-error' : undefined}
            disabled={submitState === 'sending'}
          />
        </label>
      </div>

      <label>
        <span>Screenshot link <small>optional</small></span>
        <input name="screenshot" inputMode="url" placeholder="A link to an image, if you have one" disabled={submitState === 'sending'} />
      </label>

      <label className="mw-honeypot" aria-hidden="true">
        <span>Company website</span>
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mw-form-submit">
        <button className="button button-dark" type="submit" disabled={submitState === 'sending' || submitState === 'sent'}>
          {submitState === 'sending' ? 'Sending…' : submitState === 'sent' ? 'Sent' : 'Tell Maz'}
        </button>
        <p>I&apos;ll check it myself and reply with what I&apos;d fix and the price.</p>
        <p id="tell-maz-error" className="mw-form-status mw-form-error" role="alert">{validationError}</p>
        <p className="mw-form-status" role="status" aria-live="polite">
          {submitState === 'sent' && (
            <>
              Sent. I&apos;ll reply by email.{' '}
              <button type="button" className="text-link" onClick={() => { setSubmitState('idle'); focusField('website'); }}>Send another</button>
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
