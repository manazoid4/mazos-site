'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CHECK_REPLY_TIME, CONTACT_EMAIL, MAIN_CTA } from '../site';
import { trackConversion } from '../analytics';
import { EnquiryRecovery } from '../enquiry-recovery';
import { NATIVE_FORM_ENDPOINT, buildRecoveryMailto, sendPlanEnquiry } from '../enquiry';
import { CHECK_PICK_EVENT } from '../package-link';
import { ALL_OFFERS, CREATOR_EXTRAS, EXTRAS } from '../offers';
import { HEADACHE_PICKS, SYSTEMS } from '../systems';
import { NICHE_GUIDES } from '../for/niches';
import { TYPE_IDS } from '../customer-types';
import { draftFreePlan } from './draft';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';
type FailureReason = 'rejected' | 'timeout' | 'network';

const FAILURE_COPY: Record<FailureReason, string> = {
  rejected: 'Delivery was not confirmed.',
  timeout: 'That took too long to send.',
  network: 'That could not reach me — your connection may have dropped.',
};

const SERVICE_LABEL = 'Free Plan & Fixed Quote';

/** One tap instead of typing: the problems owners name most. Each adds a line to the text box. */
export const QUICK_PICKS = [
  'Missed calls',
  'Slow replies to enquiries',
  'No-shows',
  'Chasing quotes',
  'Chasing invoices',
  'Paperwork and forms',
  'Getting more reviews',
  'Copying details between apps',
  'Orders only by DM',
  'No website to send people to',
] as const;

/** Packages and add-ons a price card may name. Anything else in `?package=` is ignored. */
const KNOWN_PACKAGES: string[] = [...ALL_OFFERS.map((offer) => offer.name), ...EXTRAS.map((extra) => extra.name), ...CREATOR_EXTRAS.map((extra) => extra.name)];

/**
 * Auto-reply for the no-JavaScript route only. FormSubmit does not send
 * autoresponses for AJAX submissions (checked 28 Sep: none arrived; its docs
 * say so), so the in-page route never promises an email confirmation.
 */
export const AUTO_REPLY = `Thanks, I've got your message. I'll read it myself and email you a short plan and a fixed price within ${CHECK_REPLY_TIME}. No call needed and no obligation. If anything changes, email ${CONTACT_EMAIL}. Manazir, Maz Works`;

export function LeakCheckForm() {
  const requestId = useRef('');
  const started = useRef(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [validationError, setValidationError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [failureReason, setFailureReason] = useState<FailureReason>('rejected');
  const [recoveryHref, setRecoveryHref] = useState(`mailto:${CONTACT_EMAIL}`);
  const [picked, setPicked] = useState<string[]>([]);
  const [pkg, setPkg] = useState('');
  // Picks carried over from "Build my system" (?systems= with JS, ?headache= without).
  const [plan, setPlan] = useState({ systems: '', trade: '' });
  // Without JavaScript the chips can't submit, so the text box stays required
  // until the form hydrates; after that a tap is enough (validated in submitRequest).
  const [hydrated, setHydrated] = useState(false);
  // Batch 3: with JavaScript the form is two short steps (the job, then who to
  // reply to) with a summary before sending. Without it, every field shows at once.
  const [step, setStep] = useState<1 | 2>(1);
  const [summary, setSummary] = useState({ task: '', website: '' });

  useEffect(() => { setHydrated(true); requestId.current = crypto.randomUUID(); }, []);

  useEffect(() => {
    const choose = (name: string | null) => {
      if (name && KNOWN_PACKAGES.includes(name)) setPkg(name);
    };
    const params = new URLSearchParams(window.location.search);
    choose(params.get('package'));
    const ids = [...(params.get('systems') || '').split(','), ...params.getAll('headache').map((id) => HEADACHE_PICKS.find((pick) => pick.id === id)?.system || '')];
    const names = [...new Set(ids)].map((id) => SYSTEMS.find((system) => system.id === id)?.name).filter(Boolean) as string[];
    const trade = [...TYPE_IDS, ...NICHE_GUIDES.map((guide) => guide.id), 'creator', 'other'].includes(params.get('trade') || '') ? params.get('trade')! : '';
    if (names.length || trade) {
      setPlan({ systems: names.join(', '), trade });
      const box = formRef.current?.querySelector<HTMLTextAreaElement>('[name="problem"]');
      if (box && names.length && !box.value) box.value = `From Build my system: ${names.join(', ')}.`;
    }
    // Links from elsewhere on the site can pass on what the visitor already typed.
    for (const [param, field] of [['website', 'website'], ['name', 'name']] as const) {
      const input = formRef.current?.querySelector<HTMLInputElement>(`[name="${field}"]`);
      const value = params.get(param)?.replace(/[<>]/g, '').slice(0, 80);
      if (input && value && !input.value) input.value = value;
    }
    const business = params.get('business')?.replace(/[<>]/g, '').slice(0, 40);
    const note = formRef.current?.querySelector<HTMLTextAreaElement>('[name="problem"]');
    if (note && business && !note.value.includes(business)) note.value = [`Business: ${business}.`, note.value].filter(Boolean).join(' ');
    const onPick = (event: Event) => choose((event as CustomEvent<string>).detail);
    window.addEventListener(CHECK_PICK_EVENT, onPick);
    return () => window.removeEventListener(CHECK_PICK_EVENT, onPick);
  }, []);

  function togglePick(label: string) {
    if (!started.current) { started.current = true; trackConversion('Form started', { placement: window.location.pathname }); }
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

  function goToDetails() {
    const box = formRef.current?.querySelector<HTMLTextAreaElement>('[name="problem"]');
    const site = formRef.current?.querySelector<HTMLInputElement>('[name="website"]');
    const task = box?.value.trim() || '';
    if (!task) {
      setInvalidField('problem');
      setValidationError('Tap at least one problem, or add a line about the job.');
      focusField('problem');
      return;
    }
    setValidationError('');
    setInvalidField('');
    setSummary({ task, website: site?.value.trim() || '' });
    setStep(2);
    window.setTimeout(() => focusField('name'), 0);
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
    const referredBy = String(data.get('referred_by') || '').trim();
    const honey = String(data.get('_honey') || '').trim();
    const page = window.location.pathname === '/' ? 'homepage' : window.location.pathname.replace(/^\//, '');
    const source = new URLSearchParams(window.location.search).get('src')?.trim() || `direct (${page})`;

    const missing = !task ? 'problem' : !name ? 'name' : !email ? 'email' : '';
    if (missing) {
      if (missing === 'problem') setStep(1);
      setInvalidField(missing);
      setValidationError(
        missing === 'problem'
          ? 'Tap at least one problem, or add a line about the job.'
          : `Add your ${missing} so I can reply.`,
      );
      focusField(missing);
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
      ['Referred by', referredBy],
      ['Interested in', pkg],
      ['Source', source],
    ]));

    setSubmitState('sending');

    // Free-plan autopilot (C9): a drafted reply Maz can approve in two minutes, built only from offers.ts.
    const draft = draftFreePlan({ name, trade: plan.trade, systems: plan.systems, package: pkg, problem: task });

    const result = await sendPlanEnquiry({
      request_id: requestId.current,
      draft: `${draft.subject}\n\n${draft.text}`,
      name,
      email,
      website,
      referred_by: referredBy,
      service: SERVICE_LABEL,
      problem: task,
      interested_in: pkg || 'Not chosen',
      systems: plan.systems,
      trade: plan.trade,
      next_step: 'Email me a plan and fixed price',
      source,
      _replyto: email,
      _subject: subject,
      _template: 'table',
      _honey: honey,
      _url: window.location.href,
    });

    if (result.ok) {
      form.reset();
      setPicked([]);
      setStep(1);
      setConfirmationSent(result.confirmationSent === true);
      setSubmitState('sent');
      trackConversion('Form submitted', { source });
      if (result.confirmationSent) trackConversion('Confirmation sent', { source });
      requestId.current = crypto.randomUUID();
      trackConversion('Check submitted', { source });
      return;
    }

    setFailureReason(result.reason);
    setSubmitState('error');
  }

  return (
    <form
      className="mw-demo-form"
      id="leak-check-form"
      data-step={hydrated && submitState !== 'sent' ? step : undefined}
      data-sent={submitState === 'sent' || undefined}
      action={NATIVE_FORM_ENDPOINT}
      method="post"
      ref={formRef}
      onSubmit={submitRequest}
      onInput={(event) => {
        if (!started.current) { started.current = true; trackConversion('Form started', { placement: window.location.pathname }); }
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
      <input type="hidden" name="interested_in" value={pkg || 'Not chosen'} />
      <input type="hidden" name="systems" value={plan.systems} />
      <input type="hidden" name="trade" value={plan.trade} />
      <p className="mw-form-kicker">Tap what fits, then tell me where to send your plan. No call needed.</p>
      {pkg ? (
        <p className="mw-form-picked">Asking about: <strong>{pkg}</strong> <button type="button" className="text-link" onClick={() => setPkg('')}>Clear</button></p>
      ) : null}
      {plan.systems ? <p className="mw-form-picked">Your plan: <strong>{plan.systems}</strong></p> : null}

      {hydrated && submitState !== 'sent' ? (
        <div className="mw-form-progress" aria-hidden="true">
          <span>Step {step} of 2 · {step === 1 ? 'The job' : 'Where to send your plan'}</span>
          <i><b style={{ transform: `scaleX(${step / 2})` }} /></i>
        </div>
      ) : null}
      <div className="mw-form-part" data-part="1">
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

        <label>
          <span>{hydrated ? <>Anything else I should know? <small>(optional)</small></> : 'What job do you want off your plate?'}</span>
          <textarea
            name="problem"
            rows={3}
            required={!hydrated}
            placeholder="For example: orders come by DM, customers forget appointments, chasing quotes"
            aria-invalid={invalidField === 'problem' || undefined}
            aria-describedby={invalidField === 'problem' ? 'leak-check-error' : undefined}
            disabled={submitState === 'sending'}
          />
        </label>

        <label>
          <span>Website or Instagram <small>(if you have one)</small></span>
          <input
            name="website"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.co.uk or @yourname"
            disabled={submitState === 'sending'}
          />
        </label>

        {hydrated ? <button type="button" className="button button-dark mw-form-next" onClick={goToDetails} disabled={submitState === 'sending'}>Next: where to send it</button> : null}
      </div>

      <div className="mw-form-part" data-part="2">
        {hydrated && summary.task ? (
          <div className="mw-form-summary">
            <p><strong>Your job:</strong> {summary.task}</p>
            {summary.website ? <p><strong>Website:</strong> {summary.website}</p> : null}
            {pkg ? <p><strong>Asking about:</strong> {pkg}</p> : null}
            <button type="button" className="text-link" onClick={() => { setStep(1); window.setTimeout(() => focusField('problem'), 0); }}>Change</button>
          </div>
        ) : null}
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
          <span>Who sent you? (optional)</span>
          <input name="referred_by" autoComplete="off" placeholder="Their name, so I can thank them" disabled={submitState === 'sending'} />
        </label>


        <label className="mw-honeypot" aria-hidden="true">
          <span>Company website</span>
          <input name="_honey" tabIndex={-1} autoComplete="off" />
        </label>

        <div className="mw-form-submit">
          <button className="button button-dark" type="submit" disabled={submitState === 'sending' || submitState === 'sent'}>
            {submitState === 'sending' ? 'Sending…' : submitState === 'sent' ? 'Sent' : MAIN_CTA}
          </button>
          <p>I usually reply myself within {CHECK_REPLY_TIME} with a plan and fixed price. Free, no obligation. <a href="/privacy">How I use your details</a>.</p>
          <p className="mw-form-status" role="status" aria-live="polite">
            {submitState === 'sent' && (
              <>
                <span className="mw-form-tick" aria-hidden="true">✓</span> <strong>Got it, thank you.</strong> {confirmationSent ? "Check your inbox. The confirmation is the same kind of instant reply I set up for clients. " : "Your request arrived safely. The instant confirmation email did not go out this time. "} What happens next: I read it myself, look at how you work now, and email your plan and fixed price from {CONTACT_EMAIL} within {CHECK_REPLY_TIME}. Nothing to pay and no call unless you want one. If it hasn’t arrived by then, check your junk folder.{' '}
                <button type="button" className="text-link" onClick={() => { setSubmitState('idle'); setStep(1); window.setTimeout(() => focusField('problem'), 0); }}>Send another</button>
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
      </div>
      <p id="leak-check-error" className="mw-form-status mw-form-error" role="alert">{validationError}</p>
    </form>
  );
}
