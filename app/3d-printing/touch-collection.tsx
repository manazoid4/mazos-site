'use client';

import Image from 'next/image';
import { TOUCH_PRICING, type TouchBundleId } from './touch-config';
import { useTouchSelection } from './touch-selection';

function moveToPersonalisation() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('personalise-title')?.focus({ preventScroll: true });
  document.getElementById('personalise')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
}

export function TouchCollection() {
  const { bundleId, selectBundle } = useTouchSelection();

  function personalise(id: TouchBundleId) {
    selectBundle(id);
    window.setTimeout(moveToPersonalisation, 0);
  }

  return (
    <section className="objects-section objects-collection" id="collection" aria-labelledby="collection-title">
      <header className="objects-section-heading">
        <p className="objects-kicker">The Touch collection / Three bundles</p>
        <h2 id="collection-title">One link or three? Pick your stand.</h2>
        <p>For your café counter, salon desk or shop till. Every bundle includes setup and your business name in plain text.</p>
      </header>

      <div className="objects-bundle-list">
        {TOUCH_PRICING.bundles.map((bundle, index) => (
          <article className={`objects-bundle ${bundleId === bundle.id ? 'is-selected' : ''}`} key={bundle.id} aria-labelledby={`${bundle.id}-title`}>
            <div className="objects-bundle-number" aria-hidden="true">0{index + 1}</div>
            <figure className="objects-bundle-visual">
              <Image src={bundle.image} alt={bundle.imageAlt} width={bundle.imageWidth} height={bundle.imageHeight} sizes="(max-width: 760px) 100vw, 48vw" loading="lazy" unoptimized />
              <figcaption>Concept visual</figcaption>
            </figure>
            <div className="objects-bundle-copy">
              <div className="objects-bundle-title">
                <div><p>Touch / {index + 1}</p><h3 id={`${bundle.id}-title`}>{bundle.name}</h3></div>
                <div className="objects-bundle-price"><strong>£{bundle.basePrice}</strong><small>With artwork £{bundle.basePrice + TOUCH_PRICING.artworkAddOnPrice}</small></div>
              </div>
              <p className="objects-bundle-short">{bundle.short}</p>
              <ul>{bundle.contents.map((item) => <li key={item}>{item}</li>)}</ul>
              <button className="objects-button objects-button-dark" type="button" onClick={() => personalise(bundle.id)} aria-pressed={bundleId === bundle.id}>
                Enquire about {bundle.name}
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="objects-artwork-note">
        <span>Optional add-on</span>
        <div><h3>Your logo or image — +£10 per bundle.</h3><p>One supplied design reused across the bundle, basic placement and one proof revision. We’ll check that it will reproduce clearly. Complex redrawing, extra designs and detailed imagery are quoted separately. Full-colour photo printing is not included.</p></div>
      </aside>
      <p className="objects-price-note">Prices cover standard designs. Delivery and nonstandard requests are confirmed separately.</p>
    </section>
  );
}
