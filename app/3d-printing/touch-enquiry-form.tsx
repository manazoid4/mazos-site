'use client';

import { useRef, useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '../site';
import { EnquiryRecovery } from '../enquiry-recovery';
import { buildRecoveryMailto, NATIVE_FORM_ENDPOINT, sendEnquiry } from '../enquiry';
import { INTENDED_USES, TOUCH_PRICING } from './touch-config';
import { useSelectedTouchBundle } from './touch-selection';

const FAILURE_COPY: Record<'rejected' | 'timeout' | 'network', string> = {
  rejected: 'Delivery was not confirmed.',
  timeout: 'That took too long to send.',
  network: 'That could not reach me — your connection may have dropped.',
};

export function TouchEnquiryForm() {
  const {
    interactive,
    submitState,
    setSubmitState,
    artwork,
    businessName,
    bundle,
    bundleId,
    estimate,
    intendedUses,
    selectBundle,
    setArtwork,
    setBusinessName,
    toggleIntendedUse,
  } = useSelectedTouchBundle();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectionError, setSelectionError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [failureReason, setFailureReason] = useState<'rejected' | 'timeout' | 'network'>('rejected');
  const [recoveryHref, setRecoveryHref] = useState(`mailto:${CONTACT_EMAIL}`);

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const destinationLinks = String(data.get('destinationLinks') || '').trim();
    const notes = String(data.get('notes') || '').trim();
    const helpFindingLinks = data.get('helpFindingLinks') === 'yes';
    const honey = String(data.get('_honey') || '').trim();

    if (intendedUses.length === 0) {
      setInvalidField('intendedUses');
      setSelectionError('Choose at least one customer action before sending.');
      window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('[data-intended-use]')?.focus(), 0);
      return;
    }

    // Native `required` accepts whitespace, so re-check here and name the missing field
    // instead of silently doing nothing.
    const missing = !businessName.trim() ? 'businessName' : !name ? 'name' : !email ? 'email' : '';
    if (missing) {
      setInvalidField(missing);
      setSelectionError(
        missing === 'businessName'
          ? 'Add the business name or wording you want on the stand.'
          : `Add your ${missing} so I can reply.`,
      );
      formRef.current?.querySelector<HTMLElement>(`[name="${missing}"]`)?.focus();
      return;
    }

    setSelectionError('');
    setInvalidField('');

    const useLabels = intendedUses.map((id) => INTENDED_USES.find((item) => item.id === id)?.label ?? id).join(', ');
    const artworkLabel = artwork
      ? `Yes — £${TOUCH_PRICING.artworkAddOnPrice}; one supplied design, basic placement and one proof revision`
      : 'No';
    const subject = `Maz Works Objects enquiry — ${bundle.name} — £${estimate} estimate`;

    setRecoveryHref(buildRecoveryMailto(subject, [
      ['Name', name],
      ['Email', email],
      ['Business name / wording', businessName.trim()],
      ['Bundle', `${bundle.name} (£${bundle.basePrice})`],
      ['Artwork add-on', artworkLabel],
      ['Customer actions', useLabels],
      ['Links supplied', destinationLinks],
      ['Wants help finding links', helpFindingLinks ? 'Yes' : 'No'],
      ['Notes', notes],
      ['Estimated product price', `£${estimate} before delivery or unusual requests`],
    ]));

    setSubmitState('sending');

    const result = await sendEnquiry({
      name,
      email,
      bundle: bundle.name,
      bundle_id: bundleId,
      physical_contents: bundle.contents.join(' | '),
      intended_uses: useLabels,
      artwork: artworkLabel,
      business_name: businessName.trim(),
      destination_links: destinationLinks || 'Not supplied yet',
      help_finding_links: helpFindingLinks ? 'Yes' : 'No',
      notes: notes || 'None supplied',
      estimated_product_price: `£${estimate} before delivery or unusual requests`,
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
    <section className="objects-section objects-personalise" id="personalise" aria-labelledby="personalise-title">
      <header className="objects-section-heading">
        <p className="objects-kicker">Get yours</p>
        <h2 id="personalise-title" tabIndex={-1}>Tell me what you want customers to do.</h2>
        <p>You do not need every link or technical detail ready. I can help.</p>
      </header>

      <p className="objects-native-note" hidden={interactive}>Choose your bundle and customer actions below. I’ll confirm the total, including delivery, before you commit. You can also <a href={`mailto:${CONTACT_EMAIL}?subject=Maz%20Works%20Objects%20enquiry`}>enquire by email</a>.</p>

      <div className="objects-enquiry-layout">
        <form className="objects-form" action={NATIVE_FORM_ENDPOINT} method="post" ref={formRef} onSubmit={submitEnquiry} onInput={(event) => {
          const input = event.target as HTMLInputElement;
          if (input.name === invalidField || (invalidField === 'intendedUses' && input.dataset.intendedUse && input.checked)) {
            setInvalidField('');
            setSelectionError('');
          }
        }}>
          <input type="hidden" name="_subject" value="Maz Works Objects — quote enquiry" />
          <input type="hidden" name="_template" value="table" />
          <fieldset disabled={submitState === 'sending'}>
            <legend><span>01</span> Choose your stand</legend>
            <div className="objects-choice-grid">
              {TOUCH_PRICING.bundles.map((option) => (
                <label key={option.id}>
                  <input type="radio" name="bundle" value={option.id} checked={bundleId === option.id} onChange={() => selectBundle(option.id)} />
                  <span><strong>{option.name}</strong><small>£{option.basePrice}</small></span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset disabled={submitState === 'sending'}>
            <legend><span>02</span> What should customers be able to do?</legend>
            <div className="objects-use-grid">
              {INTENDED_USES.map((use) => (
                <label key={use.id}>
                  <input type="checkbox" name={`customer_action_${use.id}`} value={use.label} data-intended-use={use.id} aria-invalid={invalidField === 'intendedUses' || undefined} aria-describedby={invalidField === 'intendedUses' ? 'objects-enquiry-error' : undefined} checked={intendedUses.includes(use.id)} onChange={() => toggleIntendedUse(use.id)} />
                  <span>{use.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset disabled={submitState === 'sending'}>
            <legend><span>03</span> What should it say?</legend>
            <label className="objects-field">
              <span>Business name or wording</span>
              <input name="businessName" value={businessName} aria-invalid={invalidField === 'businessName' || undefined} aria-describedby={invalidField === 'businessName' ? 'objects-enquiry-error' : undefined} onChange={(event) => setBusinessName(event.target.value)} required placeholder="For example: North Street Coffee" />
            </label>
            <label className="objects-artwork-toggle">
              <input type="checkbox" name="artwork" value="yes" checked={artwork} onChange={(event) => setArtwork(event.target.checked)} />
              <span><strong>Add my logo or artwork</strong><small>+£10 · one supplied design used across the bundle</small></span>
            </label>
          </fieldset>

          <fieldset className="objects-contact-fields" id="enquiry-details">
              <legend><span>04</span> Where should I reply?</legend>
              <div className="objects-form-row">
                <label className="objects-field"><span>Name</span><input name="name" autoComplete="name" required aria-invalid={invalidField === 'name' || undefined} aria-describedby={invalidField === 'name' ? 'objects-enquiry-error' : undefined} disabled={submitState === 'sending'} /></label>
                <label className="objects-field"><span>Email</span><input name="email" type="email" autoComplete="email" required aria-invalid={invalidField === 'email' || undefined} aria-describedby={invalidField === 'email' ? 'objects-enquiry-error' : undefined} disabled={submitState === 'sending'} /></label>
              </div>
              <details className="objects-optional-details">
                <summary>Add links or other details <small>optional</small></summary>
                <div className="objects-optional-fields">
              <label className="objects-field">
                <span>Links you already have <small>optional</small></span>
                <textarea name="destinationLinks" rows={3} disabled={submitState === 'sending'} placeholder="Paste your review, menu, booking, social or website links if you have them." />
              </label>
              <label className="objects-help-toggle">
                <input type="checkbox" name="helpFindingLinks" value="yes" disabled={submitState === 'sending'} />
                <span>I want help finding the right links</span>
              </label>
              <label className="objects-field">
                <span>Anything else? <small>optional</small></span>
                <textarea name="notes" rows={4} disabled={submitState === 'sending'} placeholder="Quantity, delivery area, colours to ask about or anything unusual." />
              </label>
                </div>
              </details>
              <label className="objects-honeypot" aria-hidden="true"><span>Website</span><input name="_honey" tabIndex={-1} autoComplete="off" /></label>
              <div className="objects-submit-row">
                <button className="objects-button objects-button-signal" type="submit" disabled={submitState === 'sending' || submitState === 'sent'}>{submitState === 'sending' ? 'Sending…' : submitState === 'sent' ? 'Sent' : 'Send my enquiry'}</button>
                <p>No payment now. You see the design and final price first.</p>
              </div>
              <p id="objects-enquiry-error" className="objects-form-error" role="alert">{selectionError}</p>
              <p className="objects-form-status" role="status" aria-live="polite">
                {submitState === 'sent' && (
                  <>
                    Sent. I’ll reply by email with any questions, the design direction and the next step.{' '}
                    <button type="button" className="text-link" onClick={() => { setSubmitState('idle'); formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus(); }}>Send another enquiry</button>
                  </>
                )}
                {submitState === 'error' && (
                  <>
                    {FAILURE_COPY[failureReason]} Your entries are still here — try again,{' '}
                    <a href={recoveryHref}>send it by email instead</a> (everything is filled in for you), or email{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </>
                )}
              </p>
              {submitState === 'error' && <EnquiryRecovery href={recoveryHref} />}
          </fieldset>
        </form>

        <aside className="objects-selection-summary" aria-label="Current price estimate" hidden={!interactive}>
          <p>Your choice</p>
          <h3>{bundle.name}</h3>
          <dl>
            <div><dt>Stand</dt><dd>£{bundle.basePrice}</dd></div>
            <div><dt>Artwork</dt><dd>{artwork ? `+£${TOUCH_PRICING.artworkAddOnPrice}` : 'Not added'}</dd></div>
            <div className="objects-estimate"><dt>Estimated product price</dt><dd>£{estimate}</dd></div>
          </dl>
          <p>{businessName.trim() || 'Add the business name or wording above'}</p>
          <small>Delivery and unusual requests are confirmed before you approve the order.</small>
        </aside>
      </div>
    </section>
  );
}
