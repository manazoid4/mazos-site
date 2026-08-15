import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MAZ Pocket — Install',
  description: 'Install the latest MAZ Pocket Cardputer ADV firmware through M5Launcher.',
  alternates: { canonical: '/maz-pocket' },
};

export default function MazPocketInstall() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">MW</span>
          <span><strong>Maz Works</strong><small>MAZ Pocket</small></span>
        </Link>
        <nav aria-label="Page navigation">
          <Link href="/">Maz Works</Link>
        </nav>
      </header>

      <section className="moved-page" id="main-content" tabIndex={-1} aria-labelledby="pocket-title">
        <p className="eyebrow">Cardputer ADV · M5Launcher</p>
        <h1 id="pocket-title">MAZ Pocket</h1>
        <p className="hero-copy">
          Six useful surfaces on a pocket device: COMM, CAPTURE, OPS, CONTROL, RECALL and FLOW.
          M5Launcher stays in charge of installing and rolling back firmware.
        </p>

        <div className="row" style={{ marginTop: 22 }}>
          <a className="button button-dark" href="/maz-pocket/latest.bin" download>
            Download latest.bin
          </a>
          <a className="button" href="/maz-pocket/rollback-v0.5.bin" download>
            Rollback v0.5
          </a>
        </div>

        <div style={{ marginTop: 34, maxWidth: 720 }}>
          <p className="eyebrow">Fast install</p>
          <ol className="hero-copy" style={{ paddingLeft: 22 }}>
            <li>Connect M5Launcher to Wi-Fi.</li>
            <li>Use its WebUI/OTA flow and install <strong>latest.bin</strong>.</li>
            <li>Launch MAZ Pocket. Keep M5Launcher as your firmware manager.</li>
          </ol>
          <p className="hero-copy">
            Permanent firmware URL: <code>https://mazos-site.vercel.app/maz-pocket/latest.bin</code>.
            Save that URL in M5Launcher Favorites where supported; future releases keep the same address.
          </p>
          <p className="hero-copy">
            Never flash this app-only image at address <code>0x0</code>. If a build misbehaves, install the v0.5 rollback above through M5Launcher.
          </p>
        </div>
      </section>
    </main>
  );
}
