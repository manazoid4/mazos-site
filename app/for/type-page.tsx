import { Breadcrumbs } from '../breadcrumbs';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { ServiceSchema } from '../service-schema';
import { StickyCheckCta } from '../sticky-cta';
import { DemoBusiness } from '../demo-business';
import { CASE_STUDIES } from '../case-studies';
import { CHECK_REPLY_TIME, MAIN_CTA } from '../site';
import { STARTER_GUARANTEE, getMenuJob } from '../offers';
import { NICHE_GUIDES } from './niches';
import type { CustomerType } from '../customer-types';

/**
 * One page per kind of customer (plan v3, B4): pain table → recipe → price →
 * what's included → one button. Ten seconds to "this is me, this is the fix,
 * this is the price".
 */
export function TypePage({ type }: { type: CustomerType }) {
  const checkHref = `/free-plan?src=for-${type.id}&trade=${type.id}`;
  const niches = NICHE_GUIDES.filter((guide) => type.niches.includes(guide.id));
  const studies = CASE_STUDIES.filter((study) => study.type === type.id);

  return (
    <main className="s-home">
      <SiteHeader /><ServiceSchema path={`/for/${type.id}`} />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="type-title">
        <Breadcrumbs items={[{ href: '/for', label: 'Who it’s for' }, { label: type.shortName }]} />
        <p className="eyebrow">{type.name} · {type.examples}</p>
        <h1 id="type-title">{type.title}.</h1>
        <p>{type.lede}</p>
        <div className="mw-actions">
          <a className="button button-signal s-button-lg" href={`${checkHref}#leak-check-form`}>{MAIN_CTA}</a>
        </div>
        <p className="mw-hero-note">Free · a plan and a fixed price, usually within {CHECK_REPLY_TIME} · no call needed.</p>
      </section>

      <section className="s-section" id="pains" aria-labelledby="type-pains-title">
        <p className="eyebrow">Sound familiar?</p>
        <h2 id="type-pains-title">Your problem, and the job that fixes it.</h2>
        <ul className="s-painfix">
          {type.pains.filter((row) => row.starter).slice(0, 4).map((row) => (
            <li key={row.pain}><span>“{row.pain}”</span><strong>{getMenuJob(row.starter!).name}</strong></li>
          ))}
        </ul>
      </section>

      <section className="s-section" id="recipes" aria-labelledby="type-recipes-title">
        <p className="eyebrow">Three ways in</p>
        <h2 id="type-recipes-title">Each with a fixed price.</h2>
        <ul className="s-recipes">
          {type.recipes.map((recipe) => (
            <li key={recipe.name}>
              <strong>{recipe.name}</strong>
              <b>{recipe.offer.price}</b>
              <span>{recipe.what}</span>
              <a className="mw-service-link" href={`/free-plan?src=for-${type.id}&trade=${type.id}&package=${encodeURIComponent(recipe.offer.name)}#leak-check-form`}>{MAIN_CTA} <span aria-hidden="true">→</span></a>
            </li>
          ))}
        </ul>
        <p className="s-small">{STARTER_GUARANTEE} <a href="/prices#included">What’s always included →</a></p>
      </section>

      <section className="s-section" id="how" aria-labelledby="type-how-title">
        <p className="eyebrow">See it working</p>
        <h2 id="type-how-title">What changes in your day.</h2>
        <DemoBusiness type={type.id} />
        {studies.map((study) => (
          <blockquote className="s-study" key={study.business}>
            <strong>{study.business}</strong> · {study.built}
            {study.result ? <p>{study.result}</p> : null}
            {study.quote ? <p>“{study.quote}”</p> : null}
            {study.href ? <a href={study.href}>Read the case study →</a> : null}
          </blockquote>
        ))}
      </section>

      <section className="mw-resource-cta" aria-labelledby="type-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="type-cta-title">Tell me the job. I’ll send a plan and a fixed price.</h2>
          <p>
            <a className="s-details-link" href="/prices">See the details: every job, the cost calculator, what’s included and what happens next →</a>
          </p>
          {niches.length ? <p><a className="s-details-link" href={`/for/${niches[0].id}`}>Guide for {niches.map((guide) => guide.shortName.toLowerCase()).join(', ')} →</a></p> : null}
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={`${checkHref}#leak-check-form`}>{MAIN_CTA}</a>
        </div>
      </section>

      <SiteFooter /><StickyCheckCta href={`${checkHref}#leak-check-form`} />
    </main>
  );
}
