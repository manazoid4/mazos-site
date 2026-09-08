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
      setSelectionError('Choose at least one use and add the business-name text for the object.');
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
      setSelectionError('Choose at least one use before sending the enquiry.');
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
          destination_links: destinationLinks || 'Not supplied at enquiry stage',
          help_finding_links: helpFindingLinks ? 'Yes' : 'No',
          notes: notes || 'None supplied',
          estimated_product_price: `£${estimate} before delivery or nonstandard requests`,
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
        <p className="objects-kicker">Personalise / Enquire</p>
        <h2 id="personalise-title">Start with the object. Send the links later if needed.</h2>
        <p>Your choices stay visible as you move through the form. Artwork is requested by email reply—there is no upload step here.</p>
      </header>

      <div className="objects-enquiry-layout">
        <form className="objects-form" onSubmit={submitEnquiry}>
          <fieldset>
            <legend><span>01</span> Choose the object</legend>
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
            <legend><span>02</span> What should it help with?</legend>
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
            <legend><span>03</span> Add your text</legend>
            <label className="objects-field">
              <span>Business-name text</span>
              <input name="businessName" value={businessName} onChange={(event) => setBusinessName(event.target.value)} required placeholder="For example: North Street Coffee" />
            </label>
            <label className="objects-artwork-toggle">
              <input type="checkbox" name="artwork" value="yes" checked={artwork} onChange={(event) => setArtwork(event.target.checked)} />
              <span><strong>Add my logo or image</strong><small>+£10 · one supplied design reused across the bundle</small></span>
            </label>
          </fieldset>

          <div className="objects-continue">
            {!detailsOpen && (
              <button className="objects-button objects-button-signal" type="button" onClick={continueToDetails}>Continue to contact details</button>
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
                <span>Destination links <small>optional at enquiry stage</small></span>
                <textarea name="destinationLinks" rows={3} disabled={submitState === 'sending'} placeholder="Paste any menu, review, booking, social or website links you already have." />
              </label>
              <label className="objects-help-toggle">
                <input type="checkbox" name="helpFindingLinks" value="yes" disabled={submitState === 'sending'} />
                <span>I need help finding my links</span>
              </label>
              <label className="objects-field">
                <span>Notes <small>optional</small></span>
                <textarea name="notes" rows={4} disabled={submitState === 'sending'} placeholder="Colours to ask about, quantity, delivery area or anything unusual." />
              </label>
              <label className="objects-honeypot" aria-hidden="true"><span>Website</span><input name="_honey" tabIndex={-1} autoComplete="off" /></label>
              <div className="objects-submit-row">
                <button className="objects-button objects-button-signal" type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? 'Sending enquiry…' : 'Send enquiry'}</button>
                <p>No payment now. Design and final quote agreed first.</p>
              </div>
              <p className="objects-form-status" role="status" aria-live="polite">
                {submitState === 'sent' && 'Enquiry sent. I’ll reply by email to confirm the design questions, delivery and final quote.'}
                {submitState === 'error' && <>That did not send. Your entries are still here—try again or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}
              </p>
            </fieldset>
          )}
        </form>

        <aside className="objects-selection-summary" aria-label="Current product estimate">
          <p>Your selection</p>
          <h3>{bundle.name}</h3>
          <dl>
            <div><dt>Base bundle</dt><dd>£{bundle.basePrice}</dd></div>
            <div><dt>Artwork</dt><dd>{artwork ? `+£${TOUCH_PRICING.artworkAddOnPrice}` : 'Not added'}</dd></div>
            <div className="objects-estimate"><dt>Product estimate</dt><dd>£{estimate}</dd></div>
          </dl>
          <p>{businessName.trim() || 'Business-name text not added yet'}</p>
          <small>Delivery and nonstandard requests are confirmed separately.</small>
        </aside>
      </div>
    </section>
  );
}
