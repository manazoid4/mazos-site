// Re-render every promo PNG and carousel PDF from the HTML in this folder.
// Run from the repo root:  node assets/promo/source/render.mjs
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

// Prices live only in app/offers.ts: refuse to render a slide whose £ figures aren't there.
const offersText = fs.readFileSync(path.resolve('app/offers.ts'), 'utf8');
for (const f of fs.readdirSync(path.dirname(fileURLToPath(import.meta.url))).filter((n) => n.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), f), 'utf8');
  for (const price of html.match(/£[\d,]+/g) ?? []) {
    if (!offersText.includes(price)) throw new Error(`${f}: ${price} is not in app/offers.ts. Update the slide to the current price.`);
  }
}

const src = path.dirname(fileURLToPath(import.meta.url));
const li = path.resolve(src, '..', 'linkedin');
const jobs = [];
for (const i of [1, 2, 3, 4, 5]) {
  jobs.push([`li-carousel1-${i}`, 1080, 1350, `carousel-missed-calls/slide-${i}.png`]);
  jobs.push([`li-carousel2-${i}`, 1080, 1350, `carousel-no-shows/slide-${i}.png`]);
}
jobs.push(['info-how-it-goes', 1080, 1080, 'infographics/how-it-works.png']);
jobs.push(['info-what-you-pay', 1080, 1080, 'infographics/what-you-pay.png']);
jobs.push(['free-demo', 1080, 1080, 'infographics/free-demo.png']);
jobs.push(['free-demo-tall', 1080, 1350, 'infographics/free-demo-1080x1350.png']);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [name, w, h, out] of jobs) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(pathToFileURL(path.join(src, `${name}.html`)).href);
  await page.screenshot({ path: path.join(li, out) });
  await page.close();
}
// Carousel PDFs: one page per slide, 1080x1350
for (const [n, dir] of [[1, 'carousel-missed-calls'], [2, 'carousel-no-shows']]) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  const imgs = [1, 2, 3, 4, 5].map((i) => 'data:image/png;base64,' + fs.readFileSync(path.join(li, dir, `slide-${i}.png`)).toString('base64'));
  await page.setContent(`<style>@page{size:1080px 1350px;margin:0}*{margin:0}img{display:block;width:1080px;height:1350px;page-break-after:always}</style>${imgs.map((d) => `<img src="${d}">`).join('')}`);
  await page.pdf({ path: path.join(li, dir, 'carousel.pdf'), width: '1080px', height: '1350px', printBackground: true });
  await page.close();
}
await browser.close();
