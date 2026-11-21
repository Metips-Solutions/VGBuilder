import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { createClientApp, resolveStaticTarget, shouldProxyPath } from './server';

describe('shouldProxyPath', () => {
  it('excludes /api/health from upstream proxy', () => {
    expect(shouldProxyPath('/api/health')).toBe(false);
  });

  it('proxies backend prefixes', () => {
    expect(shouldProxyPath('/api/inventory/sync-by-url')).toBe(true);
    expect(shouldProxyPath('/affinity/match')).toBe(true);
    expect(shouldProxyPath('/catalog')).toBe(true);
    expect(shouldProxyPath('/inventory/sync')).toBe(true);
  });

  it('does not proxy frontend pages or unrelated prefixes', () => {
    expect(shouldProxyPath('/')).toBe(false);
    expect(shouldProxyPath('/genshin')).toBe(false);
    expect(shouldProxyPath('/genshin-impact')).toBe(false);
    expect(shouldProxyPath('/apiary')).toBe(false);
  });
});

describe('resolveStaticTarget & Elysia handler', () => {
  let tmpDist: string;

  beforeAll(() => {
    tmpDist = mkdtempSync(join(tmpdir(), 'vgbuilder-astro-dist-'));
    mkdirSync(join(tmpDist, 'genshin'), { recursive: true });
    mkdirSync(join(tmpDist, '_astro'), { recursive: true });
    writeFileSync(join(tmpDist, 'index.html'), '<html>home</html>');
    writeFileSync(join(tmpDist, 'genshin', 'index.html'), '<html>genshin</html>');
    writeFileSync(join(tmpDist, '404.html'), '<html>404</html>');
    writeFileSync(join(tmpDist, '_astro', 'bundle.css'), 'body{}');
  });

  afterAll(() => {
    rmSync(tmpDist, { recursive: true, force: true });
  });

  it('resolves root, subroutes, and immutable assets', () => {
    expect(resolveStaticTarget('/', tmpDist)).toEqual({
      status: 200,
      filePath: join(tmpDist, 'index.html')
    });
    expect(resolveStaticTarget('/genshin', tmpDist)).toEqual({
      status: 200,
      filePath: join(tmpDist, 'genshin', 'index.html')
    });
    expect(resolveStaticTarget('/genshin/', tmpDist)).toEqual({
      status: 200,
      filePath: join(tmpDist, 'genshin', 'index.html')
    });
    expect(resolveStaticTarget('/_astro/bundle.css', tmpDist)).toEqual({
      status: 200,
      filePath: join(tmpDist, '_astro', 'bundle.css'),
      cacheControl: 'public, max-age=31536000, immutable'
    });
  });

  it('returns 301 for /genshin-impact and 404 for unknown or traversal paths', () => {
    expect(resolveStaticTarget('/genshin-impact', tmpDist)).toEqual({
      status: 301,
      location: '/genshin'
    });
    expect(resolveStaticTarget('/no-existe', tmpDist)).toEqual({
      status: 404,
      filePath: join(tmpDist, '404.html')
    });
    expect(resolveStaticTarget('/%2e%2e/server.ts', tmpDist)).toEqual({
      status: 404,
      filePath: join(tmpDist, '404.html')
    });
    expect(resolveStaticTarget('/%ZZ', tmpDist)).toEqual({ status: 400 });
  });

  it('serves health, redirect, static HTML, and real 404 via Elysia', async () => {
    const app = createClientApp({ distDir: tmpDist, serverUrl: 'http://127.0.0.1:3999' });

    const healthRes = await app.handle(new Request('http://localhost/api/health'));
    expect(healthRes.status).toBe(200);
    const healthJson = await healthRes.json();
    expect(healthJson.status).toBe('online');

    const homeRes = await app.handle(new Request('http://localhost/'));
    expect(homeRes.status).toBe(200);
    expect(await homeRes.text()).toBe('<html>home</html>');

    const redirRes = await app.handle(new Request('http://localhost/genshin-impact'));
    expect(redirRes.status).toBe(301);
    expect(redirRes.headers.get('location')).toBe('/genshin');

    const notFoundRes = await app.handle(new Request('http://localhost/desconocida'));
    expect(notFoundRes.status).toBe(404);
    expect(await notFoundRes.text()).toBe('<html>404</html>');
  });

  it('forwards POST JSON body intact to upstream server', async () => {
    const server = Bun.serve({
      port: 0,
      async fetch(req) {
        const url = new URL(req.url);
        const data = await req.json();
        return Response.json({ path: url.pathname + url.search, data });
      }
    });

    try {
      const app = createClientApp({
        distDir: tmpDist,
        serverUrl: `http://127.0.0.1:${server.port}`
      });

      const res = await app.handle(
        new Request('http://localhost/affinity/match?lang=es', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ carry: 'Hu Tao', roster: ['Xingqiu', 'Yelan'] })
        })
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        path: '/affinity/match?lang=es',
        data: { carry: 'Hu Tao', roster: ['Xingqiu', 'Yelan'] }
      });
    } finally {
      server.stop(true);
    }
  });
});
