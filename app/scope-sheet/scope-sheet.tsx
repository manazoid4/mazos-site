'use client';

import { useEffect, useState } from 'react';
import { ALL_OFFERS, ALWAYS_INCLUDED, CHANGES_WINDOW, EXTRAS, NEXT_STEPS, OFFERS, PAYMENT_TERMS, getMenuJob, priceAmount, type Offer } from '../offers';
import { getCustomerType } from '../customer-types';
import { CONTACT_EMAIL } from '../site';
import './scope-sheet.css';

type Sheet = { business: string; offer: Offer; jobs: string[]; extras: string[]; trade: string; date: string };

function read(): Sheet {
  const params = new URLSearchParams(window.location.search);
  const offer = ALL_OFFERS.find((item) => item.name === params.get('package')) ?? OFFERS[0];
  const jobs = (params.get('jobs') || '').split(',').map((s) => s.trim()).filter((id) => { try { getMenuJob(id); return true; } catch { return false; } });
  const extras = (params.get('extras') || '').split(',').map((s) => s.trim()).filter((name) => EXTRAS.some((extra) => extra.name === name));
  return { business: params.get('business') || 'Your business', offer, jobs, extras, trade: params.get('trade') || '', date: params.get('date') || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) };
}

export function ScopeSheet() {
  const [sheet, setSheet] = useState<Sheet | null>(null);
  useEffect(() => { setSheet(read()); }, []);
  if (!sheet) return <section className="s-section" id="main-content" tabIndex={-1}><p className="s-small">Loading your scope sheet…</p></section>;

  const type = getCustomerType(sheet.trade);
  const recipe = type?.recipes.find((item) => item.offer.id === sheet.offer.id);
  const jobs = (sheet.jobs.length ? sheet.jobs : recipe?.jobs ?? []).map((id) => getMenuJob(id));
  const extraLines = sheet.extras.map((name) => EXTRAS.find((extra) => extra.name === name)!);
  const total = sheet.offer.from + extraLines.reduce((sum, extra) => sum + priceAmount(extra.price), 0);
  const fromPrice = sheet.offer.price.startsWith('From');

  return (
    <section className="s-section ss" id="main-content" tabIndex={-1} aria-labelledby="ss-title">
      <div className="ss-head">
        <div>
          <p className="eyebrow">Scope sheet · {sheet.date}</p>
          <h1 id="ss-title">{recipe?.name ?? sheet.offer.name} for {sheet.business}</h1>
          <p className="s-lede">What is built, what isn’t, the date and the price. Nothing to pay until you’ve seen it working.</p>
        </div>
        <p className="ss-price"><span>{fromPrice ? 'From' : 'Fixed price'}</span><strong>£{total.toLocaleString('en-GB')}</strong><small>No VAT added</small></p>
      </div>

      <div className="ss-grid">
        <div>
          <h2>What is built</h2>
          <ul>
            {jobs.map((job) => <li key={job.id}><strong>{job.name}.</strong> {job.what}</li>)}
            {sheet.offer.includes.filter((line) => !/always included/i.test(line)).map((line) => <li key={line}>{line}</li>)}
            {extraLines.map((extra) => <li key={extra.name}><strong>{extra.name} ({extra.price}).</strong> {extra.what}</li>)}
          </ul>
        </div>
        <div>
          <h2>What isn’t</h2>
          <ul>{sheet.offer.excludes.map((line) => <li key={line}>{line}</li>)}</ul>
          <h2>When</h2>
          <p>{sheet.offer.delivery}</p>
          <h2>Changes</h2>
          <p>{sheet.offer.changes}</p>
          {sheet.offer.guarantee ? <><h2>Promise</h2><p>{sheet.offer.guarantee}</p></> : null}
        </div>
      </div>

      <h2>Always included</h2>
      <ul className="ss-always">{ALWAYS_INCLUDED.map((item) => <li key={item.title}><strong>{item.title}.</strong> {item.body}</li>)}</ul>

      <h2>What happens next</h2>
      <ol className="ss-steps">{NEXT_STEPS.map((step) => <li key={step.day}><strong>{step.day}: {step.title}.</strong> {step.body}</li>)}</ol>

      <h2>Paying</h2>
      <p>{PAYMENT_TERMS} {CHANGES_WINDOW.howItWorks}</p>

      <p className="ss-approve">To go ahead, reply <strong>“yes”</strong> to the email this came with, or write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Questions first are welcome.</p>
      <div className="s-actions ss-actions">
        <button type="button" className="button button-signal" onClick={() => window.print()}>Print or save as PDF</button>
        <a className="button" href={`/free-plan?package=${encodeURIComponent(sheet.offer.name)}&src=scope-sheet#leak-check-form`}>Ask a question</a>
      </div>
    </section>
  );
}
