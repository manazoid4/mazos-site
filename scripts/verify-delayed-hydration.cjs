// Start enquiries before JavaScript downloads, then verify their hydrated payloads.
// All provider requests are intercepted; no email is sent.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const TARGET_URL = process.env.TARGET_URL || 'http://127.0.0.1:3107';
const ARTIFACTS = process.env.MAZ_QA_ARTIFACTS || path.join(require('node:os').tmpdir(), 'maz-works-hour-qa');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const report = [];
  try {
    for (const routePath of ['/', '/3d-printing']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      let releaseScripts;
      const scriptsReady = new Promise(resolve => { releaseScripts = resolve; });
      await context.route('**/_next/**/*.js', async route => { await scriptsReady; await route.continue(); });
      let sent;
      await context.route('https://formsubmit.co/**', async route => {
        sent = route.request().postDataJSON();
        await route.fulfill({ contentType: 'application/json', body: '{"success":"true"}' });
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(TARGET_URL + routePath, { waitUntil: 'commit' });
      await page.locator('form').waitFor();
      if (routePath === '/') {
        await page.locator('.mw-form-options > summary').click();
        await page.locator('[name=service]').selectOption('automation');
        await page.locator('[name=problem]').fill('Entered before JavaScript finished loading');
      } else {
        await page.locator('[name=bundle][value=touch-carry]').check();
        await page.locator('[name=artwork]').check();
        await page.locator('[data-intended-use=website]').uncheck();
        await page.locator('[data-intended-use=reviews]').check();
        await page.locator('[name=businessName]').fill('Before scripts loaded');
      }
      await page.locator('[name=name]').fill('Example Customer');
      await page.locator('[name=email]').fill('customer@example.com');
      releaseScripts();
      await page.waitForLoadState('networkidle');
      if (routePath === '/3d-printing') {
        await page.locator('.objects-selection-summary').waitFor();
        assert.equal(await page.locator('[name=bundle]:checked').inputValue(), 'touch-carry');
        assert.equal(await page.locator('[name=artwork]').isChecked(), true);
        assert.equal(await page.locator('[name=businessName]').inputValue(), 'Before scripts loaded');
        assert.deepEqual(await page.locator('[data-intended-use]:checked').evaluateAll(inputs => inputs.map(input => input.dataset.intendedUse)), ['reviews']);
        assert.equal(await page.locator('.objects-estimate dd').innerText(), '£89');
      } else {
        assert.equal(await page.locator('[name=service]').inputValue(), 'automation');
      }
      await page.getByRole('button', { name: routePath === '/' ? 'Send enquiry' : 'Send my enquiry', exact: true }).click();
      await page.getByRole('button', { name: routePath === '/' ? 'Send another' : 'Send another enquiry', exact: true }).waitFor();
      assert.equal(sent.name, 'Example Customer');
      assert.equal(sent.email, 'customer@example.com');
      if (routePath === '/') {
        assert.match(sent.service, /[Aa]utomation/);
        assert.equal(sent.problem, 'Entered before JavaScript finished loading');
      } else {
        assert.equal(sent.bundle_id, 'touch-carry');
        assert.equal(sent.business_name, 'Before scripts loaded');
        assert.equal(sent.intended_uses, 'Google reviews');
        assert.equal(sent.estimated_product_price, '£89 before delivery or unusual requests');
      }
      assert.deepEqual(errors, []);
      report.push({ route: routePath, result: 'Pre-hydration inputs and choices survive in both UI and submitted payload', sent, errors });
      await context.close();
    }
    fs.mkdirSync(ARTIFACTS, { recursive: true });
    fs.writeFileSync(path.join(ARTIFACTS, 'delayed-hydration.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
