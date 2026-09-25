import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

// 11.52px at a 16px root. Below this, text on a phone stops being comfortably
// readable, and the demo pages are the ones prospects are asked to look at.
const FLOOR_REM = 0.72;
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

test('no stylesheet sets text below the readable floor', async () => {
  const files = await stylesheets(appRoot);
  assert.ok(files.length > 5, 'expected to find the site stylesheets');

  const offenders = [];
  for (const file of files) {
    const css = await readFile(file, 'utf8');
    // Only absolute rem sizes are checked. `clamp()` and `em` values are
    // relative to a parent that this rule cannot see.
    for (const match of css.matchAll(/font-size:\s*(\d*\.?\d+)rem/g)) {
      const rem = Number(match[1]);
      if (rem < FLOOR_REM) {
        const line = css.slice(0, match.index).split('\n').length;
        offenders.push(`${path.relative(process.cwd(), file)}:${line} — ${rem}rem (~${(rem * 16).toFixed(1)}px)`);
      }
    }
  }

  assert.deepEqual(offenders, [], `text below ${FLOOR_REM}rem:\n  ${offenders.join('\n  ')}`);
});
