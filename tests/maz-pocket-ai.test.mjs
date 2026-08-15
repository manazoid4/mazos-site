import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const out = path.join(root, 'out');

test('MAZ Pocket AI bridge stays private-by-design and secret-free in source', async () => {
  const [page, client, manifest] = await Promise.all([
    readFile(path.join(root, 'app', 'maz-pocket-ai', 'page.tsx'), 'utf8'),
    readFile(path.join(root, 'app', 'maz-pocket-ai', 'MazPocketAiBridge.tsx'), 'utf8'),
    readFile(path.join(root, 'public', '.well-known', 'maz-pocket.json'), 'utf8'),
  ]);

  assert.match(page, /index: false/);
  assert.match(client, /URLSearchParams\(window\.location\.hash/);
  assert.match(client, /Authorization: `Bearer \$\{token\}`/);
  assert.match(client, /sessionStorage|localStorage/);
  assert.doesNotMatch(client, /https:\/\/[^"'`]*tailscale[^"'`]*/i);
  assert.doesNotMatch(client, /Bearer\s+[A-Za-z0-9_-]{16,}/);

  const data = JSON.parse(manifest);
  assert.equal(data.kind, 'personal-device-capability-bridge');
  assert.equal(data.human_client, '/maz-pocket-ai/');
  assert.match(JSON.stringify(data), /no arbitrary remote shell/i);
  assert.doesNotMatch(JSON.stringify(data), /"token"\s*:\s*"[^\"]+"/i);
});

test('AI bridge and discovery manifest are present in the static export', async () => {
  const pageCandidates = [
    path.join(out, 'maz-pocket-ai.html'),
    path.join(out, 'maz-pocket-ai', 'index.html'),
  ];
  let pageFound = false;
  for (const candidate of pageCandidates) {
    try {
      const html = await readFile(candidate, 'utf8');
      assert.match(html, /MAZ Pocket AI Bridge/);
      assert.match(html, /noindex/i);
      pageFound = true;
      break;
    } catch {
      // Try the other Next static-export shape.
    }
  }
  assert.equal(pageFound, true, 'missing exported /maz-pocket-ai page');

  const manifestPath = path.join(out, '.well-known', 'maz-pocket.json');
  await access(manifestPath);
  const exported = JSON.parse(await readFile(manifestPath, 'utf8'));
  assert.equal(exported.version, 1);
  assert.equal(exported.human_client, '/maz-pocket-ai/');
});
