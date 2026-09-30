'use client';

import { useEffect, useRef, useState } from 'react';
import { NICHE_GUIDES } from '../for/niches';
import { builderHref } from '../system-builder';
import { HEADACHE_PICKS, getSystem, systemPrice } from '../systems';
import './live-demo.css';

const TRADES = [...NICHE_GUIDES.map((guide) => ({ id: guide.id, label: guide.shortName })), { id: 'other', label: 'Other' }];
const STEP_MS = 1100;

/** Trade details so the demo reads like the visitor's own day, not a template. */
type TradeDetail = { service: string; customer: string; slot: string; headache: string };
const TRADE_DETAIL: Record<string, TradeDetail> = {
  'salons-and-beauty': { service: 'cut and colour', customer: 'Sophie', slot: 'Tuesday at 10:30', headache: 'missed-calls' },
  'dog-groomers': { service: 'full groom for Bella', customer: 'James', slot: 'Wednesday at 9:00', headache: 'no-shows' },
  garages: { service: 'MOT and service', customer: 'Priya', slot: 'Thursday at 8:30', headache: 'chasing-quotes' },
  'cafes-and-food': { service: 'table for 6', customer: 'Tom', slot: 'Saturday at 12:30', headache: 'few-reviews' },
  'clinics-and-therapists': { service: 'physio session', customer: 'Aisha', slot: 'Monday at 17:00', headache: 'no-shows' },
  architects: { service: 'extension drawings', customer: 'Mark', slot: 'Friday at 11:00', headache: 'chasing-quotes' },
  other: { service: 'appointment', customer: 'Sam', slot: 'Tuesday at 10:30', headache: 'missed-calls' },
};

/** The text each system sends, written in the visitor's name, trade and web address. */
function message(system: string, v: { business: string; owner: string; site: string; d: TradeDetail }): string {
  const { business, owner, site, d } = v;
  const sign = owner ? `${owner} at ${business}` : business;
  switch (system) {
    case 'missed-calls': return `Hi, it’s ${sign}. Sorry we missed you, we’re with a customer. Book your ${d.service} here: ${site}/book`;
    case 'enquiries': return `Thanks for asking ${business} about a ${d.service}, ${d.customer}! It’s saved and ${owner || 'we'}’ll reply properly within the hour.`;
    case 'reminders': return `Hi ${d.customer}, a reminder from ${sign}: your ${d.service} is ${d.slot}. Reply C to confirm or R to move it.`;
    case 'reviews': return `Thanks for choosing ${business}, ${d.customer}! Got 20 seconds? A quick review helps ${owner || 'us'} a lot: ${site}/review`;
    case 'quotes': return `Hi ${d.customer}, it’s ${sign}. Just checking the quote for your ${d.service} reached you. Any questions, reply here.`;
    case 'booking': return `You’re booked with ${business}, ${d.customer}: ${d.service}, ${d.slot}. See you then.`;
    default: return `New enquiry for ${business}: ${d.customer}, ${d.service}. Details saved, reply sent, follow-up set for Friday.`;
  }
}

/** Their real domain if they give one, otherwise one made from the business name. */
function siteFor(website: string, business: string): string {
  const typed = website.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(typed)) return typed;
  return `${business.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 22) || 'yourbusiness'}.co.uk`;
}

const initials = (text: string) => text.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]!.toUpperCase()).join('') || 'YB';
const clean = (text: string | null | undefined, max: number) => (text ?? '').replace(/[<>]/g, '').slice(0, max);

/**
 * Free live demo (30 Sep): the visitor gives their business name, first name
 * and web address, picks a trade and a headache, and watches that system run
 * in their name with their trade's services, step by step.
 * - Ends on the matching package and price, with the free plan form pre-filled.
 * - The demo has its own link (?b=&n=&w=&t=&h=) so an owner can send it on.
 * - Reduced motion shows every step at once. Nothing is sent anywhere.
 */
export function LiveDemo({ source = 'live-demo' }: { source?: string }) {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [website, setWebsite] = useState('');
  const [trade, setTrade] = useState('');
  const [headache, setHeadache] = useState(HEADACHE_PICKS[0].id);
  const [pickedHeadache, setPickedHeadache] = useState(false);
  const [step, setStep] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [src, setSrc] = useState(source);
  const timer = useRef<number | undefined>(undefined);
  const stage = useRef<HTMLDivElement>(null);

  const pick = HEADACHE_PICKS.find((item) => item.id === headache) ?? HEADACHE_PICKS[0];
  const system = getSystem(pick.system);
  const business = name.trim() || 'Your business';
  const first = owner.trim().split(/\s+/)[0] ?? '';
  const detail = TRADE_DETAIL[trade] ?? TRADE_DETAIL.other;
  const site = siteFor(website, business);
  const done = step >= system.steps.length;

  const chooseTrade = (id: string) => {
    setTrade(id);
    // Suggest the usual headache for that trade until they pick one themselves.
    if (!pickedHeadache) { setHeadache(TRADE_DETAIL[id].headache); setStep(-1); }
  };

  const play = (scroll = true) => {
    window.clearTimeout(timer.current);
    if (scroll) stage.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(system.steps.length); return; }
    setStep(0);
    const next = (value: number) => {
      setStep(value);
      if (value < system.steps.length) timer.current = window.setTimeout(() => next(value + 1), STEP_MS);
    };
    timer.current = window.setTimeout(() => next(1), STEP_MS);
  };

  // A shared demo link fills everything in and plays straight away.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const b = clean(params.get('b'), 40);
    const t = params.get('t') ?? '';
    const h = params.get('h') ?? '';
    if (b) setName(b);
    // Keep the channel tag (e.g. linkedin-featured, linkedin-dm) so leads show where they came from.
    const tag = params.get('src')?.replace(/[^a-z0-9-]/gi, '').slice(0, 40);
    if (tag) setSrc(tag);
    setOwner(clean(params.get('n'), 30));
    setWebsite(clean(params.get('w'), 60));
    if (TRADES.some((item) => item.id === t)) setTrade(t);
    if (HEADACHE_PICKS.some((item) => item.id === h)) { setHeadache(h); setPickedHeadache(true); }
    if (b || h) window.setTimeout(() => document.getElementById('live-demo-play')?.click(), 400);
    return () => window.clearTimeout(timer.current);
  }, []);

  const shareLink = () => {
    const params = new URLSearchParams({ h: headache });
    if (name.trim()) params.set('b', name.trim());
    if (first) params.set('n', first);
    if (website.trim()) params.set('w', website.trim());
    if (trade) params.set('t', trade);
    const url = `${window.location.origin}/demos?${params.toString()}#live-demo`;
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2400); }, () => window.prompt('Copy your demo link', url));
  };

  const planParams = new URLSearchParams(builderHref(trade, [headache]).split('?')[1]!.split('#')[0]);
  planParams.set('src', src);
  if (name.trim()) planParams.set('business', name.trim());
  if (first) planParams.set('name', first);
  if (website.trim()) planParams.set('website', website.trim());
  const planHref = `/leak-check?${planParams.toString()}#leak-check-form`;

  return (
    <div className="ld" id="live-demo">
      <form className="ld-setup" onSubmit={(event) => { event.preventDefault(); play(); }}>
        <div className="ld-row">
          <label className="ld-field">
            <span>Business name</span>
            <input value={name} onChange={(event) => setName(clean(event.target.value, 40))} placeholder="e.g. Bloom Hair Studio" autoComplete="organization" />
          </label>
          <label className="ld-field">
            <span>Your first name</span>
            <input value={owner} onChange={(event) => setOwner(clean(event.target.value, 30))} placeholder="e.g. Jess" autoComplete="given-name" />
          </label>
        </div>
        <label className="ld-field">
          <span>Your website <small>(optional)</small></span>
          <input value={website} onChange={(event) => setWebsite(clean(event.target.value, 60))} placeholder="e.g. bloomhair.co.uk" inputMode="url" autoComplete="url" />
        </label>
        <fieldset className="ld-field">
          <legend>Your trade</legend>
          <div className="ld-chips">
            {TRADES.map((item) => (
              <label key={item.id} className="ld-chip"><input type="radio" name="ld-trade" checked={trade === item.id} onChange={() => chooseTrade(item.id)} /><span>{item.label}</span></label>
            ))}
          </div>
        </fieldset>
        <fieldset className="ld-field">
          <legend>What costs you most?</legend>
          <div className="ld-chips">
            {HEADACHE_PICKS.map((item) => (
              <label key={item.id} className="ld-chip"><input type="radio" name="ld-headache" checked={headache === item.id} onChange={() => { setHeadache(item.id); setPickedHeadache(true); setStep(-1); }} /><span>{item.label}</span></label>
            ))}
          </div>
        </fieldset>
        <button type="submit" id="live-demo-play" className="button button-signal ld-play">{step < 0 ? 'Play my demo' : 'Play again'}</button>
        <p className="ld-note">Runs in your browser. Nothing is saved or sent.</p>
      </form>

      <div className="ld-stage" ref={stage} data-state={step < 0 ? 'idle' : done ? 'done' : 'playing'}>
        <p className="ld-kicker">{first ? `${first}, here’s ${business} on a busy day` : `${business} on a busy day`}</p>
        <div className="ld-phone" aria-label={`Example: ${system.name} for ${business}`} role="group">
          <p className="ld-phone-bar"><span className="ld-avatar" aria-hidden="true">{initials(business)}</span><span className="ld-phone-name">{business}<small>{site}</small></span><span>9:41</span></p>
          <ol className="ld-steps">
            {system.steps.map((item, index) => (
              <li key={item.title} className={`ld-step${step >= index ? ' is-on' : ''}${step === index ? ' is-now' : ''}`}>
                <span className="ld-dot" aria-hidden="true" />
                <span className="ld-step-copy">
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                  {index === 1 ? <span className="ld-bubble">{step === 1 ? <span className="ld-typing" aria-hidden="true"><i /><i /><i /></span> : null}<span className="ld-bubble-text">{message(system.id, { business, owner: first, site, d: detail })}</span></span> : null}
                </span>
              </li>
            ))}
          </ol>
          <div className="ld-progress" aria-hidden="true"><b style={{ transform: `scaleX(${Math.max(0, Math.min(step, system.steps.length)) / system.steps.length})` }} /></div>
          {step < 0 ? <p className="ld-idle">Press <em>Play my demo</em> to watch it run.</p> : null}
        </div>
        <p className="ld-sr" aria-live="polite">{step >= 0 && step < system.steps.length ? `${system.steps[step].title}. ${system.steps[step].detail}` : done ? system.result : ''}</p>

        <div className={`ld-offer${done ? ' is-on' : ''}`} aria-hidden={!done}>
          <p className="ld-result">{system.result}</p>
          <p className="ld-price">{first ? `${first}, to` : 'To'} make this real for {business}: <strong>{systemPrice(system)}</strong></p>
          <div className="ld-actions">
            <a className="button button-signal" href={planHref} tabIndex={done ? undefined : -1}>Make it real: free plan and fixed price</a>
            <button type="button" className="ld-share" onClick={shareLink} tabIndex={done ? undefined : -1}>{copied ? 'Link copied ✓' : 'Copy my demo link'}</button>
          </div>
          <p className="ld-note">Fixed price agreed first. Half now, half when it works. Example only: {detail.customer} is not a real customer.</p>
        </div>
      </div>
    </div>
  );
}
