import { Breadcrumbs } from '../breadcrumbs';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { ServiceSchema } from '../service-schema';
import { Scenes } from '../scenes';
import { getSystem } from '../systems';
import { SystemBuilder } from '../system-builder';
import { CostCalculator } from '../cost-calculator';
import { ScrollReveal } from '../scroll-reveal';
import { StickyCheckCta } from '../sticky-cta';
import { KitIcon } from '../brand-kit/kit-icon';
import { AutomationMenu, OfferCard, OwnVsRent, AlwaysIncluded } from '../price-list';
import { NextSteps, TilesJoin, TweaksTimeline } from '../explainers';
import { CHECK_REPLY_TIME } from '../site';
import { LADDER, OFFERS, STARTER_GUARANTEE } from '../offers';
import { NICHE_GUIDES } from './niches';
import { painCells, type CustomerType } from '../customer-types';

/**
 * One page per kind of customer (plan v3, B4): pain table → recipe → price →
 * what's included → one button. Ten seconds to "this is me, this is the fix,
 * this is the price".
 */
export function TypePage({ type }: { type: CustomerType }) {
  const checkHref = `/free-plan?src=for-${type.id}&trade=${type.id}`;
  const niches = NICHE_GUIDES.filter((guide) => type.niches.includes(guide.id));
  const offers = [...new Set(type.recipes.map((recipe) => recipe.offer))];

  return (
    <main className="s-home">
      <SiteHeader /><ServiceSchema path={`/for/${type.id}`} />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="type-title">
        <Breadcrumbs items={[{ href: '/for', label: 'Who it’s for' }, { label: type.shortName }]} />
        <span className="mw-niche-badge" aria-hidden="true"><KitIcon name={type.icon} size={56} /></span>
        <p className="eyebrow">{type.name} · {type.examples}</p>
        <h1 id="type-title">{type.title}.</h1>
        <p>{type.lede}</p>
        <div className="mw-actions">
          <a className="button button-signal s-button-lg" href={`${checkHref}#leak-check-form`}>Get my free plan</a>
        </div>
        <p className="mw-hero-note">Free · a plan and a fixed price, usually within {CHECK_REPLY_TIME} · no call needed. Start from {OFFERS[0].price}.</p>
      </section>

      <section className="s-section" id="pains" aria-labelledby="type-pains-title">
        <p className="eyebrow">Your problems, and the step that fixes each one</p>
        <h2 id="type-pains-title">Pick the line that sounds like you.</h2>
        <div className="s-compare-scroll s-pains" tabIndex={0} role="region" aria-label="Problems and fixes">
          <table>
            <thead><tr><th scope="col">The problem</th><th scope="col">One-day set-up</th><th scope="col">Starter</th><th scope="col">Business System adds</th></tr></thead>
            <tbody>
              {type.pains.map((row) => {
                const cells = painCells(row);
                return <tr key={row.pain}><th scope="row">“{row.pain}”</th><td>{cells.setup}</td><td>{cells.starter}</td><td>{cells.system}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
        <ol className="s-ladder s-ladder-mini" aria-label="The fix ladder">
          {LADDER.map((rung) => <li key={rung.step}><a href={rung.href}><strong>{rung.step}</strong><b>{rung.price}</b></a></li>)}
        </ol>
      </section>

      <section className="s-section" id="recipes" data-reveal aria-labelledby="type-recipes-title">
        <p className="eyebrow">Named recipes, not abstract packages</p>
        <h2 id="type-recipes-title">Three ways in, each with a fixed price.</h2>
        <ul className="s-recipes">
          {type.recipes.map((recipe) => (
            <li key={recipe.name}>
              <strong>{recipe.name}</strong>
              <b>{recipe.offer.price}</b>
              <span>{recipe.what}</span>
              {recipe.jobs.length ? <small>Jobs inside: {recipe.jobs.map((id) => getSystemName(id)).join(' · ')}</small> : null}
              <a className="mw-service-link" href={`/free-plan?src=for-${type.id}&trade=${type.id}&package=${encodeURIComponent(recipe.offer.name)}#leak-check-form`}>Get my free plan for this <span aria-hidden="true">→</span></a>
            </li>
          ))}
        </ul>
        <p className="s-small">{STARTER_GUARANTEE}</p>
      </section>

      <section className="s-section" id="how" data-reveal aria-labelledby="type-how-title">
        <p className="eyebrow">See it working</p>
        <h2 id="type-how-title">What changes in your day.</h2>
        <Scenes systems={type.scenes.map((id) => getSystem(id))} />
      </section>

      <section className="s-section" id="price" aria-labelledby="type-price-title">
        <p className="eyebrow">Prices and what’s included</p>
        <h2 id="type-price-title">Every step, with the full spec.</h2>
        <div className="s-prices">
          {offers.map((offer) => <OfferCard offer={offer} checkHref="/free-plan" key={offer.id} />)}
        </div>
        {type.id !== 'creators' ? <TilesJoin /> : null}
        <h3 className="s-track-title">Jobs {type.shortName.toLowerCase()} pick most</h3>
        <AutomationMenu checkHref="/free-plan" only={type.menu} />
        <h3 className="s-track-title">Always included</h3>
        <AlwaysIncluded />
      </section>

      <section className="s-section" id="numbers" data-reveal aria-labelledby="type-numbers-title">
        <p className="eyebrow">Your numbers</p>
        <h2 id="type-numbers-title">What is it costing you now?</h2>
        <CostCalculator preset={type.calculator} />
        <OwnVsRent />
      </section>

      <section className="s-section" id="next" aria-labelledby="type-next-title">
        <p className="eyebrow">What happens next</p>
        <h2 id="type-next-title">From your message to live, with day numbers.</h2>
        <NextSteps />
        <TweaksTimeline />
      </section>

      <section className="s-section" id="build" aria-labelledby="type-build-title">
        <p className="eyebrow">Build it yourself in two taps</p>
        <h2 id="type-build-title">Tap your headaches, see the price.</h2>
        <SystemBuilder presetTrade={type.id} />
      </section>

      {niches.length ? (
        <p className="mw-related mw-related-quiet"><a href={`/for/${niches[0].id}`}><strong>Guides for {niches.map((guide) => guide.shortName.toLowerCase()).join(', ')} →</strong> <span>Real examples found at UK businesses, names left out.</span></a></p>
      ) : null}

      <section className="mw-resource-cta" aria-labelledby="type-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="type-cta-title">Tell me the job. I’ll send a plan and a fixed price.</h2>
          <p>A written scope sheet before you pay anything. Not your kind of business? Every UK business is welcome.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={`${checkHref}#leak-check-form`}>Get my free plan</a>
        </div>
      </section>

      <SiteFooter /><StickyCheckCta href={`${checkHref}#leak-check-form`} /><ScrollReveal />
    </main>
  );
}

function getSystemName(menuId: string): string {
  // Menu ids and system ids differ in a few places; show the plain menu name.
  const map: Record<string, string> = { 'missed-call': 'Missed-call text-back', 'online-booking': 'Online booking', reminders: 'Appointment reminders', rebooking: 'Rebooking reminders', waitlist: 'Waitlist fill', reviews: 'Review requests', 'quote-follow-up': 'Quote follow-up', 'payment-reminders': 'Payment reminders', 'job-updates': 'Job update texts', 'dm-replies': 'Instagram auto-replies', 'keyword-dm': 'Keyword DM → free resource', 'email-list': 'Email list + welcome email', 'one-list': 'Enquiries into one list', onboarding: 'Onboarding form + reminders', milestones: 'Milestone updates', 'weekly-report': 'Weekly report' };
  return map[menuId] ?? menuId;
}
