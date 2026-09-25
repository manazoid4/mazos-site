const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const TARGET_URL = process.env.TARGET_URL || 'http://127.0.0.1:3107';
const OUT = process.env.MAZ_QA_ARTIFACTS || path.join(require('node:os').tmpdir(), 'maz-works-hour-qa');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: false });
  const report = [];
  try {
    for (const mode of ['javascript-disabled', 'javascript-blocked']) {
      const context = await browser.newContext({ javaScriptEnabled: mode !== 'javascript-disabled', viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      if (mode === 'javascript-blocked') await page.route('**/_next/**/*.js', route => route.abort());
      // Exercise the same native form-action allowlist asserted against vercel.json.
      await page.route(`${TARGET_URL}/**`, async route => {
        if (route.request().resourceType() !== 'document') return route.fallback();
        const response = await route.fetch();
        const html = (await response.text()).replace('<head>', '<head><meta http-equiv="Content-Security-Policy" content="form-action \'self\' https://formsubmit.co">');
        await route.fulfill({ response, body: html });
      });
      let sent;
      await page.route('https://formsubmit.co/**', async route => {
        sent = { method: route.request().method(), url: route.request().url(), fields: Object.fromEntries(new URLSearchParams(route.request().postData())) };
        await route.fulfill({ contentType: 'text/html', body: '<html lang="en"><head><title>Mock confirmation</title></head><body><h1>Mock confirmation — no email sent</h1></body></html>' });
      });
      for (const route of ['/', '/3d-printing']) {
        await page.goto(TARGET_URL + route, { waitUntil: 'networkidle' });
        if (route === '/3d-printing') {
          assert.equal(await page.locator('.objects-bundle.is-selected').count(), 0, 'Do not imply that the static catalogue tracks native form choices');
          await page.locator('[name=businessName]').fill('Example Shop');
          await page.locator('[name=businessName]').press('Enter');
          assert.equal(await page.evaluate(() => document.activeElement.name), 'name', 'Implicit submission must focus the visible required contact field');
          await page.locator('[name=bundle][value=touch-carry]').check();
          await page.locator('[data-intended-use=website]').uncheck();
          await page.locator('[data-intended-use=reviews]').check();
          await page.locator('[data-intended-use=bookings]').check();
          await page.locator('[name=businessName]').fill('Example Shop');
          await page.locator('[name=artwork]').check();
          assert.equal(await page.locator('.objects-selection-summary').isVisible(), false, 'Do not display an estimate that cannot update');
          await page.locator('.objects-optional-details > summary').click();
          await page.locator('[name=notes]').fill('Three bundles please; confirm delivery separately.');
          assert.notEqual(
            await page.locator('[name=bundle][value=touch-carry] + span').evaluate(el => getComputedStyle(el).backgroundColor),
            await page.locator('[name=bundle][value=touch-one] + span').evaluate(el => getComputedStyle(el).backgroundColor),
            'Native selection must update the visual highlight without JavaScript',
          );
        } else {
          await page.locator('.mw-form-options > summary').click();
          await page.locator('[name=service]').selectOption('automation');
          await page.locator('[name=nextStep]').selectOption({ label: 'A quote and scope for a specific job' });
          await page.locator('[name=problem]').fill('Example admin workflow enquiry');
        }
        await page.locator('[name=name]').fill('Example Customer');
        await page.locator('[name=email]').fill('customer@example.com');
        await page.screenshot({ path: path.join(OUT, `${mode}-${route === '/' ? 'home' : 'objects'}.png`), fullPage: true });
        const submit = page.getByRole('button', { name: route === '/' ? 'Send enquiry' : 'Send my enquiry', exact: true });
        await submit.click();
        await page.waitForURL('https://formsubmit.co/**');
        assert.equal(sent.method, 'POST');
        assert.equal(new URL(sent.url).search, '');
        assert.equal(sent.fields.email, 'customer@example.com');
        assert.equal(sent.fields._template, 'table');
        if (route === '/3d-printing') {
          assert.equal(sent.fields.bundle, 'touch-carry');
          assert.equal(sent.fields.customer_action_reviews, 'Google reviews');
          assert.equal(sent.fields.customer_action_bookings, 'Bookings');
          assert.equal(sent.fields.customer_action_website, undefined);
          assert.equal(sent.fields.artwork, 'yes');
          assert.equal(sent.fields.businessName, 'Example Shop');
          assert.match(sent.fields.notes, /Three bundles/);
        } else {
          assert.equal(sent.fields.service, 'automation');
          assert.equal(sent.fields.nextStep, 'A quote and scope for a specific job');
          assert.equal(sent.fields.problem, 'Example admin workflow enquiry');
        }
        report.push({ mode, route, result: 'Native POST carries current choices; no enquiry data in URL; CSP allows only intended form destination', sent });
      }
      await context.close();
    }
    fs.writeFileSync(path.join(OUT, 'native-enquiry.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
