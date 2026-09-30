'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CHECK_REPLY_TIME, CONTACT_EMAIL } from '../site';
import { trackConversion } from '../analytics';
import { EnquiryRecovery } from '../enquiry-recovery';
import { NATIVE_FORM_ENDPOINT, buildRecoveryMailto, sendEnquiry } from '../enquiry';
import { CHECK_PICK_EVENT } from '../package-link';
import { EXTRAS, OFFERS } from '../offers';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';
type FailureReason = 'rejected' | 'timeout' | 'network';

const FAILURE_COPY: Record<FailureReason, string> = {
  rejected: 'Delivery was not confirmed.',
  timeout: 'That took too long to send.',
  network: 'That could not reach me — your connection may have dropped.',
};

const TRADES = ['salons-and-beauty', 'dog-groomers', 'garages', 'cafes-and-food', 'clinics-and-therapists', 'architects'];
const SERVICE_LABEL = 'Free Plan & Fixed Quote';

/** One tap instead of typing: the problems owners name most. Each adds a line to the text box. */
export const QUICK_PICKS = [
  'Missed calls',
  'Slow replies to enquiries',
  'No-shows',
  'Chasing quotes',
  'Getting more reviews',
  'Copying details between apps',
] as const;

/** Packages and add-ons a price card may name. Anything else in `?package=` is ignored. */
const KNOWN_PACKAGES: string[] = [...OFFERS.map((offer) => offer.name), ...EXTRAS.map((extra) => extra.name)];

/**
 * Auto-reply for the no-JavaScript route only. FormSubmit does not send
 * autoresponses for AJAX submissions (checked 28 Sep: none arrived; its docs
 * say so), so the in-page route never promises an email confirmation.
 */
export const AUTO_REPLY = `Thanks, I've got your message. I'll read it myself and email you a short plan and a fixed price within ${CHECK_REPLY_TIME}. No call needed and no obligation. If anything changes, email ${CONTACT_EMAIL}. Manazir, Maz Works`;

export function LeakCheckForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [validationError, setValidationError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [failureReason, setFailureReason] = useState<FailureReason>('rejected');
  const [recoveryHref, setRecoveryHref] = useState(`mailto:${CONTACT_EMAIL}`);
  const [picked, setPicked] = useState<string[]>([]);
  const [pkg, setPkg] = useState('');
  const [trade, setTrade] = useState('');
  const [source, setSource] = useState('direct');
  const [detailsOpen, setDetailsOpen] = useState(false);
  // Without JavaScript the chips can't submit, so the text box stays required
  // until the form hydrates; after that a tap is enough (validated in submitRequest).
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const choose = (name: string | null) => {
      if (name && KNOWN_PACKAGES.includes(name)) setPkg(name);
    };
    const params = new URLSearchParams(window.location.search);
    choose(params.get('package'));
    const requestedTrade = params.get('trade') || params.get('src')?.replace(/^for-/, '') || '';
    if (TRADES.includes(requestedTrade)) setTrade(requestedTrade);
    setSource((params.get('src') || `direct (${window.location.pathname})`).replace(/[^a-zA-Z0-9_ /()-]/g, '').slice(0, 80));
    const onPick = (event: Event) => choose((event as CustomEvent<string>).detail);
    window.addEventListener(CHECK_PICK_EVENT, onPick);
    return () => window.removeEventListener(CHECK_PICK_EVENT, onPick);
  }, []);

  function togglePick(label: string) {
    const box = formRef.current?.querySelector<HTMLTextAreaElement>('[name="problem"]');
    const on = !picked.includes(label);
    setPicked(on ? [...picked, label] : picked.filter((item) => item !== label));
    if (!box) return;
    const line = `${label}.`;
    box.value = on
      ? [box.value.trim(), line].filter(Boolean).join(' ')
      : box.value.replace(line, '').replace(/\s{2,}/g, ' ').trim();
    if (on && invalidField === 'problem') {
      setInvalidField('');
      setValidationError('');
    }
  }

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
    const task = String(data.get('problem') || '').trim();
    const website = String(data.get('website') || '').trim();
    const honey = String(data.get('_honey') || '').trim();
    const volume = String(data.get('enquiries_per_week') || 'Not given');

    const missing = !task ? 'problem' : !name ? 'name' : !email ? 'email' : '';
    if (missing) {
      setInvalidField(missing);
      setValidationError(
        missing === 'problem'
          ? 'Tap at least one problem, or add a line about the job.'
          : `Add your ${missing} so I can reply.`,
      );
      if (missing === 'problem') setDetailsOpen(true);
      requestAnimationFrame(() => focusField(missing));
      return;
    }

    setValidationError('');
    setInvalidField('');

    const subject = `Maz Works — free plan and quote — ${website || name}`;
    setRecoveryHref(buildRecoveryMailto(subject, [
      ['Name', name],
      ['Email', email],
      ['The job', task],
      ['Website', website],
      ['Interested in', pkg],
      ['Source', source],
      ['Trade', trade],
      ['Enquiries per week', volume],
    ]));

    setSubmitState('sending');

    const result = await sendEnquiry({
      name,
      email,
      website,
      service: SERVICE_LABEL,
      problem: task,
      interested_in: pkg || 'Not chosen',
      next_step: 'Email me a plan and fixed price',
      source,
      trade: trade || 'Not given',
      enquiries_per_week: volume,
      _replyto: email,
      _subject: subject,
      _template: 'table',
      _honey: honey,
      _url: window.location.href,
    });

    if (result.ok) {
      form.reset();
      setPicked([]);
      setSubmitState('sent');
      trackConversion('Check submitted', { source });
      return;
    }

    setFailureReason(result.reason);
    setSubmitState('error');
  }

  if (submitState === 'sent') return (
    <div className="mw-form-success" id="leak-check-form" role="status" tabIndex={-1} ref={(element) => element?.focus()}>
      <h3>Got it, thank you.</h3>
      <p>I’ll read it myself and email your plan and fixed price from {CONTACT_EMAIL} within {CHECK_REPLY_TIME}. No payment or call needed.</p>
      <p>While you wait: <a href={trade ? `/for/${trade}` : '/#example'}>{trade ? 'check the three tips for your trade' : 'see what your plan will look like'}</a>.</p>
      <p className="s-small">If it hasn’t arrived by then, check your junk folder or email me.</p>
    </div>
  );

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
      <input type="hidden" name="_subject" value="Maz Works — free plan and quote" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="service" value={SERVICE_LABEL} />
      <input type="hidden" name="_autoresponse" value={AUTO_REPLY} />
      <input type="hidden" name="trade" value={trade} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="interested_in" value={pkg || 'Not chosen'} />
      <p className="mw-form-kicker">Tap, add your name and email, done. No call needed.</p>
      {pkg ? (
        <p className="mw-form-picked">Asking about: <strong>{pkg}</strong> <button type="button" className="text-link" onClick={() => setPkg('')}>Clear</button></p>
      ) : null}

      <fieldset className="mw-quick-picks">
        <legend>What’s costing you customers or time? <small>Tap any that fit</small></legend>
        <div>
          {QUICK_PICKS.map((label) => (
            <button type="button" key={label} aria-pressed={picked.includes(label)} onClick={() => togglePick(label)} disabled={submitState === 'sending'}>
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mw-volume">
        <legend>Roughly how many enquiries a week? <small>(optional)</small></legend>
        <div>{['Under 10', '10–50', '50+'].map((value) => <label key={value}><input type="radio" name="enquiries_per_week" value={value} disabled={submitState === 'sending'} /><span>{value}</span></label>)}</div>
      </fieldset>
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


      <details className="mw-form-details" open={!hydrated || detailsOpen} onToggle={(event) => setDetailsOpen(event.currentTarget.open)}>
      <summary>Add a detail or website (optional)</summary>
      <label>
        <span>{hydrated ? <>Anything else I should know? <small>(optional)</small></> : 'What job do you want off your plate?'}</span>
        <textarea
          name="problem"
          rows={3}
          required={!hydrated}
          placeholder="For example: chasing quotes, typing enquiries into a spreadsheet, reminding customers"
          aria-invalid={invalidField === 'problem' || undefined}
          aria-describedby={invalidField === 'problem' ? 'leak-check-error' : undefined}
          disabled={submitState === 'sending'}
        />
      </label>

      <label>
        <span>Your website <small>(optional)</small></span>
        <input
          name="website"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.co.uk"
          disabled={submitState === 'sending'}
        />
      </label>

      </details>
      <label className="mw-honeypot" aria-hidden="true">
        <span>Company website</span>
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mw-form-submit">
        <button className="button button-dark" type="submit" disabled={submitState === 'sending'}>
          {submitState === 'sending' ? 'Sending…' : 'Get a free plan and price'}
        </button>
        <p>I reply myself within {CHECK_REPLY_TIME} with a plan and fixed price. Free, no obligation.</p>
        <p id="leak-check-error" className="mw-form-status mw-form-error" role="alert">{validationError}</p>
        <p className="mw-form-status" role="status" aria-live="polite">
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
