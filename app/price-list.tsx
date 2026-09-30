import { CARE_PLAN, COMPARISON, EXTRA_GROUPS, GUARANTEE, NOT_INCLUDED, OFFERS, PROMISES } from './offers';
import { PackageLink } from './package-link';

/**
 * The full price list: packages, the ManyPets-style comparison, promises,
 * every add-on, the care plan and what's not included. Lives on /prices so
 * the homepage can stay a short page that sells one first step.
 */
export function PriceList({ checkHref }: { checkHref: string }) {
  return (
    <>
      <div className="s-prices">
        {OFFERS.map((offer) => (
          <article className={`s-price${offer.tag ? ' s-price-main' : ''}`} key={offer.id}>
            {offer.tag ? <p className="s-price-tag">{offer.tag}</p> : null}
            <h3>{offer.name}</h3>
            <p className="s-price-amount">{offer.price}</p>
            <p>{offer.body}</p>
            <ul>{offer.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <PackageLink href={checkHref} pick={offer.name}>Get a free plan and price <span aria-hidden="true">→</span></PackageLink>
          </article>
        ))}
      </div>

      <div className="s-compare" id="compare">
        <h3>Compare packages</h3>
        <p className="s-small s-compare-hint">Swipe the table to see all three.</p>
        <div className="s-compare-scroll" tabIndex={0} role="region" aria-label="Package comparison table">
          <table>
            <thead>
              <tr><th scope="col"><span className="s-visually-hidden">What you get</span></th>{OFFERS.map((offer) => <th scope="col" key={offer.id}>{offer.name}</th>)}</tr>
            </thead>
            <tbody>
              {COMPARISON.map(({ row, values }) => (
                <tr key={row}><th scope="row">{row}</th>{values.map((value, index) => <td key={OFFERS[index].id}>{value}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ul className="s-promises" aria-label="Included with every package">
        {PROMISES.map((promise) => <li key={promise.title}><strong>{promise.title}</strong><span>{promise.body}</span></li>)}
      </ul>

      <div className="s-extras" id="extras">
        <h3>Add-ons</h3>
        <p className="s-small">Standard set-ups with a fixed, one-off price. Add them to any package, or buy one on its own. They go on the same invoice.</p>
        {EXTRA_GROUPS.map((group) => (
          <div className="s-extras-group" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((extra) => <li key={extra.name}><div><strong>{extra.name}</strong><span>{extra.what}</span><PackageLink href={checkHref} pick={extra.name}>Get a free plan and price <span aria-hidden="true">→</span></PackageLink></div><strong className="s-extras-price">{extra.price}</strong></li>)}
            </ul>
          </div>
        ))}
        <div className="s-extras-care" id="care">
          <h4>After it’s built</h4>
          <p><strong>{CARE_PLAN.name}, {CARE_PLAN.price}.</strong> {CARE_PLAN.body}</p>
        </div>
      </div>

      <div className="s-not-included">
        <h3>What’s not included</h3>
        <ul>{NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="s-guarantee">
        <strong>The guarantee.</strong> {GUARANTEE} You own everything I build.
      </div>
    </>
  );
}
