// Visible browser checks. Provider responses are intercepted; no email is sent.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const TARGET_URL = process.env.TARGET_URL || 'http://127.0.0.1:3107';
const ARTIFACTS = process.env.MAZ_QA_ARTIFACTS || path.join(require('node:os').tmpdir(), 'maz-works-hour-qa');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const errors = [];
  const checks = [];
  page.on('pageerror', error => errors.push(error.message));
  let release;
  await page.route('https://formsubmit.co/**', async route => {
    await new Promise(resolve => { release = resolve; });
    await route.fulfill({ contentType: 'application/json', body: '{"success":"false"}' });
  });
  try {
    await page.goto(TARGET_URL + '/3d-printing', { waitUntil: 'networkidle' });
    const choose = page.getByRole('button', { name: 'Choose Touch + Carry', exact: true });
    await choose.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'personalise-title', 'Selection must move keyboard focus into the enquiry');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.name), 'bundle');
    assert.equal(await page.locator('[name=bundle]:checked').inputValue(), 'touch-carry');
    checks.push('Catalogue selection moves focus into enquiry; next Tab reaches selected radio');

    await page.locator('[name=businessName]').fill('Example Shop');
    await page.locator('.objects-optional-details > summary').focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.name), 'destinationLinks');
    await page.locator('[name=name]').fill('Example Customer');
    await page.locator('[name=email]').fill('customer@example.com');
    await page.locator('[data-intended-use=website]').uncheck();
    await page.getByRole('button', { name: 'Send my enquiry', exact: true }).click();
    const action = page.locator('[data-intended-use]').first();
    assert.equal(await action.getAttribute('aria-invalid'), 'true');
    const errorId = await action.getAttribute('aria-describedby');
    assert.match(await page.locator('#' + errorId).innerText(), /Choose at least one/);
    assert.equal(await page.evaluate(() => document.activeElement.dataset.intendedUse), await action.getAttribute('data-intended-use'));
    await page.keyboard.press('Space');
    assert.equal(await action.getAttribute('aria-invalid'), null);
    checks.push('Optional details work by keyboard; required contacts stay visible; missing action is focused, described, and clears on correction');

    await page.locator('[name=businessName]').fill('   ');
    await page.getByRole('button', { name: 'Send my enquiry', exact: true }).click();
    assert.equal(await page.locator('[name=businessName]').getAttribute('aria-invalid'), 'true');
    await page.locator('[name=businessName]').fill('Example Shop');
    assert.equal(await page.locator('[name=businessName]').getAttribute('aria-invalid'), null);
    await page.getByRole('button', { name: 'Send my enquiry', exact: true }).click();
    await page.getByRole('button', { name: 'Sending…' }).waitFor();
    assert.equal(await page.locator('.objects-bundle-copy button[aria-pressed=true]').isDisabled(), true, 'Catalogue cannot change the bundle during a pending submission');
    release();
    await page.getByRole('status').filter({ hasText: 'Delivery was not confirmed' }).waitFor();
    assert.equal(await page.locator('.objects-bundle-copy button[aria-pressed=true]').isEnabled(), true);
    checks.push('Whitespace business-name error clears on correction; catalogue locks only during submission');

    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      const links = await page.locator('.mw-jumpbar a').evaluateAll(links => links.map(link => ({ label: link.textContent, left: link.getBoundingClientRect().left, right: link.getBoundingClientRect().right, height: link.getBoundingClientRect().height })));
      assert.ok(links.every(link => link.left >= 0 && link.right <= width && link.height >= 44), 'All mobile shortcuts, including Contact, must be visible without a sideways scroll');
    }
    checks.push('Every mobile section shortcut stays visible and tappable at 320 and 390px');
    await page.locator('[name=name]').fill('   ');
    await page.locator('[name=email]').fill('customer@example.com');
    await page.locator('[name=problem]').fill('Example');
    await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
    const name = page.locator('[name=name]');
    assert.equal(await name.getAttribute('aria-invalid'), 'true');
    assert.match(await page.locator('#' + await name.getAttribute('aria-describedby')).innerText(), /Add your name/);
    await name.fill('Example Customer');
    assert.equal(await name.getAttribute('aria-invalid'), null);
    checks.push('Homepage validation identifies and describes the field, and clears stale error after input');
    assert.deepEqual(errors, []);
    fs.mkdirSync(ARTIFACTS, { recursive: true });
    fs.writeFileSync(path.join(ARTIFACTS, 'keyboard-enquiry.json'), JSON.stringify({ checks, errors }, null, 2));
    console.log(JSON.stringify({ checks, errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
