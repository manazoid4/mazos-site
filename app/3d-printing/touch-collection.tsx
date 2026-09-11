'use client';

import Image from 'next/image';
import { TOUCH_PRICING, type TouchBundleId } from './touch-config';
import { useTouchSelection } from './touch-selection';

function moveToPersonalisation() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        <p className="objects-kicker">Three simple choices</p>
        <h2 id="collection-title">Choose how many customer actions you want.</h2>
        <p>Every option arrives set up for the links we agree. You approve the wording and final price before anything is made.</p>
      </header>

      <div className="objects-bundle-list">
        {TOUCH_PRICING.bundles.map((bundle, index) => (
          <article className={`objects-bundle ${bundleId === bundle.id ? 'is-selected' : ''}`} key={bundle.id} aria-labelledby={`${bundle.id}-title`}>
            <div className="objects-bundle-number" aria-hidden="true">0{index + 1}</div>
            <figure className="objects-bundle-visual">
              <Image src={bundle.image} alt={bundle.imageAlt} width={bundle.imageWidth} height={bundle.imageHeight} sizes="(max-width: 760px) 100vw, 48vw" unoptimized />
              <figcaption>Concept visual</figcaption>
            </figure>
            <div className="objects-bundle-copy">
              <div className="objects-bundle-title">
                <div><p>Touch / {index + 1}</p><h3 id={`${bundle.id}-title`}>{bundle.name}</h3></div>
                <div className="objects-bundle-price"><strong>£{bundle.basePrice}</strong><small>With your artwork £{bundle.basePrice + TOUCH_PRICING.artworkAddOnPrice}</small></div>
              </div>
              <p className="objects-bundle-short">{bundle.short}</p>
              <ul>{bundle.contents.map((item) => <li key={item}>{item}</li>)}</ul>
              <button className="objects-button objects-button-dark" type="button" onClick={() => personalise(bundle.id)} aria-pressed={bundleId === bundle.id}>
                Choose {bundle.name}
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="objects-artwork-note">
        <span>Optional +£10</span>
        <div><h3>Add your logo or supplied artwork.</h3><p>Send one design you want used across the bundle. Basic placement and one proof revision are included. If the artwork needs redrawing or something more involved, I will tell you before quoting it.</p></div>
      </aside>
      <p className="objects-price-note">Delivery and unusual requests are confirmed before you approve the order.</p>
    </section>
  );
}
