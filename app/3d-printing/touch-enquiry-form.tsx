'use client';

import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '../site';
import { INTENDED_USES, TOUCH_PRICING } from './touch-config';
import { useSelectedTouchBundle } from './touch-selection';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function TouchEnquiryForm() {
  const {
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectionError, setSelectionError] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  function continueToDetails() {
    if (intendedUses.length === 0 || !businessName.trim()) {
      setSelectionError('Choose what you want the stand to help with and add the business name or wording you want on it.');
      return;
    }
    setSelectionError('');
    setDetailsOpen(true);
    window.setTimeout(() => document.getElementById('enquiry-details')?.focus(), 0);
  }

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
      setSelectionError('Choose at least one customer action before sending.');
      window.setTimeout(() => document.querySelector<HTMLInputElement>('input[name="intendedUses"]')?.focus(), 0);
      return;
    }
    if (!name || !email || !businessName.trim()) return;
    setSelectionError('');
    setSubmitState('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          bundle: bundle.name,
          bundle_id: bundleId,
          physical_contents: bundle.contents.join(' | '),
          intended_uses: intendedUses.map((id) => INTENDED_USES.find((item) => item.id === id)?.label ?? id).join(', '),
          artwork: artwork
            ? `Yes — £${TOUCH_PRICING.artworkAddOnPrice}; one supplied design, basic placement and one proof revision`
            : 'No',
          business_name: businessName.trim(),
          destination_links: destinationLinks || 'Not supplied yet',
          help_finding_links: helpFindingLinks ? 'Yes' : 'No',
          notes: notes || 'None supplied',
          estimated_product_price: `£${estimate} before delivery or unusual requests`,
          _replyto: email,
          _subject: `Maz Works Objects enquiry — ${bundle.name} — £${estimate} estimate`,
          _template: 'table',
          _honey: honey,
          _url: window.location.href,
        }),
      });

      const payload = await response.json().catch(() => null) as { success?: boolean | string; message?: string } | null;
      const rejected = payload?.success === false || payload?.success === 'false';
      if (!response.ok || rejected) throw new Error(payload?.message || 'Unable to send enquiry');

      form.reset();
      setSubmitState('sent');
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <section className="objects-section objects-personalise" id="personalise" aria-labelledby="personalise-title">
      <header className="objects-section-heading">
        <p className="objects-kicker">Get yours</p>
        <h2 id="personalise-title">Tell me what you want customers to do.</h2>
        <p>You do not need every link or technical detail ready. Pick the stand, tell me the job, and I can help with the rest.</p>
      </header>

      <div className="objects-enquiry-layout">
        <form className="objects-form" onSubmit={submitEnquiry}>
          <fieldset>
            <legend><span>01</span> Choose your stand</legend>
            <div className="objects-choice-grid">
              {TOUCH_PRICING.bundles.map((option) => (
                <label key={option.id} className={bundleId === option.id ? 'is-selected' : ''}>
                  <input type="radio" name="bundle" value={option.id} checked={bundleId === option.id} onChange={() => selectBundle(option.id)} />
                  <span><strong>{option.name}</strong><small>£{option.basePrice}</small></span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>02</span> What should customers be able to do?</legend>
            <div className="objects-use-grid">
              {INTENDED_USES.map((use) => (
                <label key={use.id} className={intendedUses.includes(use.id) ? 'is-selected' : ''}>
                  <input type="checkbox" name="intendedUses" value={use.id} checked={intendedUses.includes(use.id)} onChange={() => toggleIntendedUse(use.id)} />
                  <span>{use.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>03</span> What should it say?</legend>
            <label className="objects-field">
              <span>Business name or wording</span>
              <input name="businessName" value={businessName} onChange={(event) => setBusinessName(event.target.value)} required placeholder="For example: North Street Coffee" />
            </label>
            <label className="objects-artwork-toggle">
              <input type="checkbox" name="artwork" value="yes" checked={artwork} onChange={(event) => setArtwork(event.target.checked)} />
              <span><strong>Add my logo or artwork</strong><small>+£10 · one supplied design used across the bundle</small></span>
            </label>
          </fieldset>

          <div className="objects-continue">
            {!detailsOpen && (
              <button className="objects-button objects-button-signal" type="button" onClick={continueToDetails}>Add contact details</button>
            )}
            <p role="alert">{selectionError}</p>
          </div>

          {detailsOpen && (
            <fieldset className="objects-contact-fields" id="enquiry-details" tabIndex={-1}>
              <legend><span>04</span> Where should I reply?</legend>
              <div className="objects-form-row">
                <label className="objects-field"><span>Name</span><input name="name" autoComplete="name" required disabled={submitState === 'sending'} /></label>
                <label className="objects-field"><span>Email</span><input name="email" type="email" autoComplete="email" required disabled={submitState === 'sending'} /></label>
              </div>
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
              <label className="objects-honeypot" aria-hidden="true"><span>Website</span><input name="_honey" tabIndex={-1} autoComplete="off" /></label>
              <div className="objects-submit-row">
                <button className="objects-button objects-button-signal" type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? 'Sending…' : 'Send my enquiry'}</button>
                <p>No payment now. You see the design and final price first.</p>
              </div>
              <p className="objects-form-status" role="status" aria-live="polite">
                {submitState === 'sent' && 'Sent. I’ll reply by email with any questions, the design direction and the next step.'}
                {submitState === 'error' && <>That did not send. Your entries are still here—try again or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}
              </p>
            </fieldset>
          )}
        </form>

        <aside className="objects-selection-summary" aria-label="Current price estimate">
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
