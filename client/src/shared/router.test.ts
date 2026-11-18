import { describe, expect, it } from 'bun:test';

// Ponytail check: validación de normalización de rutas y fallback
function normalizeRoutePath(rawPath: string, hash?: string): string {
  if (hash && hash.startsWith('#/')) {
    const hashRoute = hash.slice(1).split('?')[0].toLowerCase();
    return hashRoute || '/';
  }
  const cleaned = rawPath.toLowerCase().replace(/\/+$/, '') || '/';
  return cleaned;
}

describe('Router path normalization', () => {
  it('normalizes root correctly', () => {
    expect(normalizeRoutePath('/')).toBe('/');
    expect(normalizeRoutePath('')).toBe('/');
    expect(normalizeRoutePath('///')).toBe('/');
  });

  it('normalizes /genshin and subpaths', () => {
    expect(normalizeRoutePath('/genshin')).toBe('/genshin');
    expect(normalizeRoutePath('/GENSHIN/')).toBe('/genshin');
    expect(normalizeRoutePath('/genshin-impact')).toBe('/genshin-impact');
  });

  it('handles hash fallback routes', () => {
    expect(normalizeRoutePath('/', '#/genshin')).toBe('/genshin');
    expect(normalizeRoutePath('/', '#/zzz?query=1')).toBe('/zzz');
  });
});


describe('Route classification for 404 detection', () => {
  function matchRoute(path: string) {
    const isGenshin = path === '/genshin' || path === '/genshin-impact';
    const isHome = path === '/' || path === '';
    const isNotFound = !isGenshin && !isHome;
    return { isGenshin, isHome, isNotFound };
  }

  it('detects home route correctly', () => {
    expect(matchRoute('/').isHome).toBe(true);
    expect(matchRoute('/').isNotFound).toBe(false);
  });

  it('detects genshin route correctly', () => {
    expect(matchRoute('/genshin').isGenshin).toBe(true);
    expect(matchRoute('/genshin-impact').isGenshin).toBe(true);
    expect(matchRoute('/genshin').isNotFound).toBe(false);
  });

  it('identifies 404 not found routes', () => {
    expect(matchRoute('/desconocido').isNotFound).toBe(true);
    expect(matchRoute('/random-game').isNotFound).toBe(true);
    expect(matchRoute('/genshin/otro').isNotFound).toBe(true);
  });
});
