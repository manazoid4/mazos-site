import { BRAND_OFFERS, CARE_PLANS, COMPARISON, DELIVERY_PROMISE, EXTRA_GROUPS, NOT_INCLUDED, OFFERS, PROMISES, TRACKS, UPGRADE_CREDITS, WEB_OFFERS, type Offer } from './offers';
import { PackageLink } from './package-link';

/** One package card with its full spec folded away, so phones stay short. */
export function OfferCard({ offer, checkHref }: { offer: Offer; checkHref: string }) {
  return (
    <article className={`s-price${offer.tag ? ' s-price-main' : ''}`} id={`offer-${offer.id}`}>
      {offer.tag ? <p className="s-price-tag">{offer.tag}</p> : null}
      <h3>{offer.name}</h3>
      <p className="s-price-amount">{offer.price}</p>
      <p>{offer.body}</p>
      <ul>{offer.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      <details className="s-offer-spec">
        <summary>What’s included, and what isn’t</summary>
        <p><strong>Best for:</strong> {offer.forWho}</p>
        <p><strong>Included</strong></p>
        <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        <p><strong>Not included</strong></p>
        <ul>{offer.excludes.map((item) => <li key={item}>{item}</li>)}</ul>
        <p><strong>When:</strong> {offer.delivery}</p>
        <p><strong>Changes:</strong> {offer.changes}</p>
        <p><strong>Next step:</strong> {offer.upsell}</p>
      </details>
      <PackageLink href={checkHref} pick={offer.name}>Get a free plan for this <span aria-hidden="true">→</span></PackageLink>
    </article>
  );
}

/**
 * The full price list: the four kinds of work, every package with its spec,
 * the systems comparison, add-ons, care plans and what's not included.
 * Lives on /prices so the homepage can stay a short page that sells one first step.
 */
export function PriceList({ checkHref }: { checkHref: string }) {
  return (
    <>
      <ul className="s-tracks" aria-label="Four kinds of work">
        {TRACKS.map((track) => <li key={track.id}><strong>{track.name}</strong><span>{track.is}</span><small>{track.example}</small></li>)}
      </ul>

      <h3 className="s-track-title" id="systems">Automation and custom software</h3>
      <div className="s-prices">
        {OFFERS.map((offer) => <OfferCard offer={offer} checkHref={checkHref} key={offer.id} />)}
      </div>

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

      <h3 className="s-track-title" id="websites">Sales pages and websites</h3>
      <div className="s-prices">
        {WEB_OFFERS.map((offer) => <OfferCard offer={offer} checkHref={checkHref} key={offer.id} />)}
      </div>

      <h3 className="s-track-title" id="brand">Brand, for people who sell through social media</h3>
      <div className="s-prices">
        {BRAND_OFFERS.map((offer) => <OfferCard offer={offer} checkHref={checkHref} key={offer.id} />)}
      </div>
      <p className="s-small">More for creators on the <a href="/brand-kit">creators page</a>.</p>

      <ul className="s-promises" aria-label="Included with every package">
        {PROMISES.map((promise) => <li key={promise.title}><strong>{promise.title}</strong><span>{promise.body}</span></li>)}
      </ul>

      <div className="s-extras" id="extras">
        <h3>Add-ons</h3>
        <p className="s-small">Standard set-ups on tools you already use, with a fixed, one-off price. Add them to any package, or buy one on its own. They go on the same invoice.</p>
        {EXTRA_GROUPS.map((group) => (
          <div className="s-extras-group" key={group.title}>
            <h4>{group.title}</h4>
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

      <div className="s-not-included">
        <h3>What’s not included</h3>
        <ul>{NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="s-guarantee">
        <strong>Dates and upgrades.</strong> {DELIVERY_PROMISE} {UPGRADE_CREDITS.join(' ')} You own everything I build.
      </div>
    </>
  );
}
