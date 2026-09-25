import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

// The floor is .72rem. `rem` resolves against <html>, which the site never
// re-sizes, so that is 11.52px. Below it, text on a phone stops being
// comfortably readable — and the demo pages are the ones prospects are asked
// to look at.
const FLOOR_PX = 11.52;
const ROOT_PX = 16;
const appRoot = path.join(process.cwd(), 'app');

async function stylesheets(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await stylesheets(full)));
    else if (entry.name.endsWith('.css')) found.push(full);
  }
  return found;
}

/**
 * The smallest size a declaration can render at, in px, or null when the value
 * is relative to something this file cannot see (`em`, `%`, a bare keyword) or
 * carries no size at all (`font: inherit`).
 *
 * `clamp()` is judged by its first argument, which is the floor it resolves to
 * on a narrow viewport.
 */
export function smallestPx(value) {
  const clamped = value.match(/clamp\(\s*([^,]+),/);
  const token = (clamped ? clamped[1] : value).match(/(\d*\.?\d+)(px|rem)\b/);
  if (!token) return null;
  const size = Number(token[1]);
  return token[2] === 'rem' ? size * ROOT_PX : size;
}

/**
 * Every declaration that sets a text size: `font-size`, and the `font`
 * shorthand the Objects stylesheet uses. Matching only these two keys keeps
 * `font-family`, `font-weight` and custom properties out.
 */
function* sizeDeclarations(css) {
  for (const match of css.matchAll(/(?<![-\w])(font-size|font)\s*:\s*([^;}]+)/g)) {
    yield { value: match[2].trim(), index: match.index };
  }
}

test('no stylesheet sets text below the readable floor', async () => {
  const files = await stylesheets(appRoot);
  assert.ok(files.length > 5, 'expected to find the site stylesheets');

  const offenders = [];
  for (const file of files) {
    const css = await readFile(file, 'utf8');
    for (const { value, index } of sizeDeclarations(css)) {
      const px = smallestPx(value);
      if (px === null || px >= FLOOR_PX) continue;
      const line = css.slice(0, index).split('\n').length;
      offenders.push(`${path.relative(process.cwd(), file)}:${line} — "${value}" renders at ${px}px`);
    }
  }

  assert.deepEqual(offenders, [], `text below ${FLOOR_PX}px:\n  ${offenders.join('\n  ')}`);
});

test('the floor check reads every form a size can be written in', () => {
  // Guards the check itself. Every case below was a real way to slip past an
  // earlier version of it: px, the `font` shorthand (whose weight comes first
  // and must not be mistaken for the size), and a clamp() whose minimum is
  // under the floor while its maximum is not.
  assert.equal(smallestPx('0.52rem'), 8.32);
  assert.equal(smallestPx('.72rem'), 11.52);
  assert.equal(smallestPx('11px'), 11);
  assert.equal(smallestPx('800 .72rem/1 var(--mono)'), 11.52);
  assert.equal(smallestPx('700 clamp(2rem, 4vw, 3.6rem)/.9 var(--sans)'), 32);
  assert.equal(smallestPx('clamp(0.6rem, 2vw, 1.4rem)'), 9.6);
  assert.equal(smallestPx('clamp(24px, 4vw, 42px)'), 24);
  // Relative and size-less values cannot be judged from the stylesheet alone.
  assert.equal(smallestPx('inherit'), null);
  assert.equal(smallestPx('0.83em'), null);
  assert.equal(smallestPx('smaller'), null);
});
