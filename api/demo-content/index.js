import dessertLane from './dessert-lane.js';

const demos = new Map([[dessertLane.slug, dessertLane]]);

function cleanPath(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string' || raw === '') return '';
  const normalized = raw.replace(/^\/+|\/+$/g, '');
  if (normalized.includes('..')) return null;
  return normalized;
}

export function getDemoDefinition(slug) {
  return demos.get(slug) ?? null;
}

export function getDemoContent(slug, pathValue) {
  const demo = getDemoDefinition(slug);
  const path = cleanPath(pathValue);
  if (!demo || path === null) return null;
  return demo.routes.get(path) ?? null;
}

export function listDemoMetadata() {
  return Array.from(demos.values(), (demo) => ({
    slug: demo.slug,
    businessName: demo.businessName,
    relationshipStatus: demo.relationshipStatus,
    internalLabel: demo.internalLabel,
  }));
}
