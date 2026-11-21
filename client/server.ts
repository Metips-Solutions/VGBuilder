import { Elysia } from 'elysia';
import { existsSync, statSync } from 'fs';
import { join, resolve, sep } from 'path';

export const DEFAULT_SERVER_URL = 'http://localhost:3000';
export const DEFAULT_DIST_DIR = resolve(import.meta.dir, 'dist');

const PROXY_PREFIXES = ['/api', '/catalog', '/inventory', '/affinity'] as const;
const HOP_BY_HOP_HEADERS = [
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length'
];

export function shouldProxyPath(pathname: string): boolean {
  if (pathname === '/api/health') return false;
  return PROXY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export type StaticTarget =
  | { status: 200; filePath: string; cacheControl?: string }
  | { status: 301; location: string }
  | { status: 400 }
  | { status: 404; filePath: string };

export function resolveStaticTarget(
  rawPathname: string,
  distDir: string = DEFAULT_DIST_DIR
): StaticTarget {
  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(rawPathname);
  } catch {
    return { status: 400 };
  }

  if (decodedPath.includes('\0')) {
    return { status: 400 };
  }

  const normalized = decodedPath === '/' ? '/' : decodedPath.replace(/\/+$/, '');
  if (normalized === '/genshin-impact') {
    return { status: 301, location: '/genshin' };
  }

  const rootDir = resolve(distDir);
  const notFoundPath = join(rootDir, '404.html');
  const relativePath = decodedPath.replace(/^\/+/, '');
  const candidate = resolve(rootDir, relativePath);

  if (candidate !== rootDir && !candidate.startsWith(rootDir + sep)) {
    return { status: 404, filePath: notFoundPath };
  }

  if (relativePath !== '' && existsSync(candidate) && statSync(candidate).isFile()) {
    const cacheControl = decodedPath.startsWith('/_astro/')
      ? 'public, max-age=31536000, immutable'
      : undefined;
    return { status: 200, filePath: candidate, cacheControl };
  }

  const indexCandidate = join(candidate, 'index.html');
  if (existsSync(indexCandidate) && statSync(indexCandidate).isFile()) {
    return { status: 200, filePath: indexCandidate };
  }

  return { status: 404, filePath: notFoundPath };
}

export async function proxyToBackend(
  request: Request,
  serverUrl: string = process.env.SERVER_URL ?? DEFAULT_SERVER_URL
): Promise<Response> {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, serverUrl);

  const headers = new Headers(request.headers);
  for (const h of HOP_BY_HOP_HEADERS) {
    headers.delete(h);
  }

  const method = request.method.toUpperCase();
  const hasBody = method !== 'GET' && method !== 'HEAD';
  const rawBody = hasBody ? await request.arrayBuffer() : undefined;

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method,
      headers,
      body: rawBody && rawBody.byteLength > 0 ? rawBody : undefined,
      redirect: 'manual'
    });

    const resHeaders = new Headers(upstream.headers);
    resHeaders.delete('transfer-encoding');
    resHeaders.delete('connection');
    resHeaders.delete('content-encoding');
    resHeaders.delete('content-length');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: resHeaders
    });
  } catch {
    return Response.json(
      { success: false, message: 'Backend upstream unavailable' },
      { status: 502 }
    );
  }
}

export function createClientApp(options?: {
  distDir?: string;
  serverUrl?: string;
}) {
  const distDir = options?.distDir ?? DEFAULT_DIST_DIR;
  const serverUrl = options?.serverUrl ?? process.env.SERVER_URL ?? DEFAULT_SERVER_URL;

  return new Elysia()
    .get('/api/health', () => ({
      status: 'online',
      framework: 'Elysia + Bun (Astro Static + API Proxy)',
      upstream: serverUrl,
      timestamp: new Date().toISOString()
    }))
    .all('*', async ({ request }) => {
      const url = new URL(request.url);

      if (shouldProxyPath(url.pathname)) {
        return proxyToBackend(request, serverUrl);
      }

      const target = resolveStaticTarget(url.pathname, distDir);

      if (target.status === 400) {
        return new Response('Bad Request', { status: 400 });
      }

      if (target.status === 301) {
        return new Response(null, {
          status: 301,
          headers: { Location: target.location }
        });
      }

      if (target.status === 404) {
        if (existsSync(target.filePath)) {
          return new Response(Bun.file(target.filePath), {
            status: 404,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
        return new Response('Not Found', { status: 404 });
      }

      const headers = target.cacheControl
        ? { 'Cache-Control': target.cacheControl }
        : undefined;

      return new Response(Bun.file(target.filePath), { status: 200, headers });
    }, { parse: 'none' });
}

const app = createClientApp();

if (import.meta.main) {
  const port = Number(process.env.PORT ?? 3001);
  app.listen(port);
  console.log(
    `🦊 Servidor Astro + Proxy iniciado en http://localhost:${app.server?.port} (API -> ${process.env.SERVER_URL ?? DEFAULT_SERVER_URL})`
  );
}

export default app;
