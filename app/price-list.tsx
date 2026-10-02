import { ALWAYS_INCLUDED, AUTOMATION_MENU, BUY_LINKS, CARE_PLANS, COMPARISON, DELIVERY_PROMISE, EXTRA_GROUPS, LADDER, LANES, NOT_INCLUDED, OFFERS, OWN_VS_RENT, PROMISES, STARTER_GUARANTEE, TRACKS, UPGRADE_CREDITS, type Offer } from './offers';
import { PackageLink } from './package-link';
import { TilesJoin } from './explainers';

/** "Buy now" only appears once Maz has pasted a Stripe payment link into BUY_LINKS. */
export function BuyNow({ name }: { name: string }) {
  const href = BUY_LINKS[name];
  if (!href) return null;
  return <a className="button button-dark s-buy-now" href={href} rel="noopener">Buy now</a>;
}

/** One package card with its full spec folded away, so phones stay short. */
export function OfferCard({ offer, checkHref }: { offer: Offer; checkHref: string }) {
  return (
    <article className={`s-price${offer.tag ? ' s-price-main' : ''}`} id={`offer-${offer.id}`}>
      {offer.tag ? <p className="s-price-tag">{offer.tag}</p> : null}
      <h3>{offer.name}</h3>
      <p className="s-price-amount">{offer.price}</p>
      <p>{offer.body}</p>
      <ul>{offer.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      {offer.guarantee ? <p className="s-price-guarantee"><strong>Guarantee:</strong> {offer.guarantee}</p> : null}
      <details className="s-offer-spec">
        <summary>What’s included, and what isn’t</summary>
        <p><strong>Best for:</strong> {offer.forWho}</p>
        <p><strong>Included</strong></p>
        <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        <p><strong>Always included</strong></p>
        <ul>{ALWAYS_INCLUDED.map((item) => <li key={item.title}>{item.title}</li>)}</ul>
        <p><strong>Not included</strong></p>
        <ul>{offer.excludes.map((item) => <li key={item}>{item}</li>)}</ul>
        <p><strong>When:</strong> {offer.delivery}</p>
        <p><strong>Changes:</strong> {offer.changes}</p>
        <p><strong>Next step:</strong> {offer.upsell}</p>
      </details>
      <PackageLink href={checkHref} pick={offer.name}>Get my free plan for this <span aria-hidden="true">→</span></PackageLink>
      <BuyNow name={offer.name} />
    </article>
  );
}

/** The fix ladder: five rungs, same for every kind of business. */
export function Ladder() {
  return (
    <ol className="s-ladder" aria-label="The fix ladder">
      {LADDER.map((rung, index) => (
        <li key={rung.step} style={{ ['--i' as string]: index }}>
          <a href={rung.href}><strong>{rung.step}</strong><span>{rung.what}</span><b>{rung.price}</b></a>
        </li>
      ))}
    </ol>
  );
}

/** What every package gets, said once. */
export function AlwaysIncluded() {
  return (
    <ul className="s-always" aria-label="Always included">
      {ALWAYS_INCLUDED.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.body}</span></li>)}
    </ul>
  );
}

/** Own it once vs rent it monthly. */
export function OwnVsRent() {
  return (
    <div className="s-own" id="own-vs-rent">
      <h3>Own it, or rent it?</h3>
      <p className="s-small">Agencies sell the same missed-call text-back on a monthly plan. Here it’s yours after one payment.</p>
      <table>
        <thead><tr><th scope="col"><span className="s-visually-hidden">Row</span></th><th scope="col">Maz Works</th><th scope="col">Monthly agency</th></tr></thead>
        <tbody>{OWN_VS_RENT.map((row) => <tr key={row.row}><th scope="row">{row.row}</th><td className="s-own-yes">{row.own}</td><td>{row.rent}</td></tr>)}</tbody>
      </table>
      <p className="s-small">Agency figure is a typical UK list price seen in October 2026, not a quote from any one company.</p>
    </div>
  );
}

/** The 16 jobs "automation" means. */
export function AutomationMenu({ checkHref, only }: { checkHref: string; only?: string[] }) {
  const jobs = only ? AUTOMATION_MENU.filter((job) => only.includes(job.id)) : AUTOMATION_MENU;
  return (
    <ul className="s-menu" id="menu" aria-label="Automation menu">
      {jobs.map((job) => (
        <li key={job.id}><strong>{job.name}</strong><span>{job.what}</span><PackageLink href={checkHref} pick={OFFERS[0].name}>Start with this <span aria-hidden="true">→</span></PackageLink></li>
      ))}
    </ul>
  );
}

/**
 * The full price list: the ladder, three lanes with every package and its
 * spec, the automation menu, the systems comparison, quick fixes and add-ons,
 * own-vs-rent, care plans and what's not included.
 * Lives on /prices so the homepage can stay a short page that sells one first step.
 */
export function PriceList({ checkHref }: { checkHref: string }) {
  return (
    <>
      <h3 className="s-track-title" id="ladder">Five steps, one for every size of job</h3>
      <Ladder />

      {LANES.map((lane) => (
        <div key={lane.id}>
          <h3 className="s-track-title" id={lane.id}>{lane.title}</h3>
          <p className="s-small">{lane.note}</p>
          <div className="s-prices">
            {lane.offers.map((offer) => <OfferCard offer={offer} checkHref={checkHref} key={offer.id} />)}
          </div>
          {lane.id === 'systems' ? <TilesJoin /> : null}
        </div>
      ))}
      <p className="s-small">{STARTER_GUARANTEE} {UPGRADE_CREDITS.join(' ')}</p>

      <h3 className="s-track-title" id="automation-menu">What “automation” means: pick from the menu</h3>
      <p className="s-small">A Starter is one of these. A Business System is three joined up, plus the weekly report.</p>
      <AutomationMenu checkHref={checkHref} />

      <div className="s-compare" id="compare">
        <h3>Compare packages</h3>
        <p className="s-small s-compare-hint">Swipe the table to see all three.</p>
        <div className="s-compare-scroll" tabIndex={0} role="region" aria-label="Package comparison table">
          <table>
            <thead>
              <tr><th scope="col"><span className="s-visually-hidden">What you get</span></th>{OFFERS.map((offer) => <th scope="col" key={offer.id} tabIndex={0}>{offer.name}</th>)}</tr>
            </thead>
            <tbody>
              {COMPARISON.map(({ row, values }) => (
                <tr key={row}><th scope="row">{row}</th>{values.map((value, index) => <td key={OFFERS[index].id}>{value}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="s-track-title" id="always-included">Always included, whichever step you pick</h3>
      <AlwaysIncluded />

      <ul className="s-tracks" aria-label="Four kinds of work">
        {TRACKS.map((track) => <li key={track.id}><strong>{track.name}</strong><span>{track.is}</span><small>{track.example}</small></li>)}
      </ul>

      <ul className="s-promises" aria-label="Included with every package">
        {PROMISES.map((promise) => <li key={promise.title}><strong>{promise.title}</strong><span>{promise.body}</span></li>)}
      </ul>

      <div className="s-extras" id="extras">
        <h3>One-day set-ups and add-ons</h3>
        {EXTRA_GROUPS.map((group) => (
          <div className="s-extras-group" key={group.id} id={group.id}>
            <h4>{group.title}</h4>
            <p className="s-small">{group.note}</p>
            <ul>
              {group.items.map((extra) => <li key={extra.name}><div><strong>{extra.name}</strong><span>{extra.what}</span><PackageLink href={checkHref} pick={extra.name}>Ask for this <span aria-hidden="true">→</span></PackageLink></div><strong className="s-extras-price">{extra.price}</strong></li>)}
            </ul>
          </div>
        ))}
        <div className="s-extras-care" id="care">
          <h4>After it’s built</h4>
          {CARE_PLANS.map((plan) => <p key={plan.id}><strong>{plan.name}, {plan.price}.</strong> {plan.body}</p>)}
        </div>
      </div>

      <OwnVsRent />

      <div className="s-not-included">
        <h3>What’s not included</h3>
        <ul>{NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="s-guarantee">
        <strong>Dates and upgrades.</strong> {DELIVERY_PROMISE} You own everything I build.
      </div>
    </>
  );
}
