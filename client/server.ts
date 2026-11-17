import { Elysia } from 'elysia';
import { existsSync } from 'fs';
import { join } from 'path';

const port = Number(process.env.PORT ?? 3001);

const app = new Elysia()
  // Endpoints API
  .get('/api/health', () => ({
    status: 'online',
    framework: 'Elysia + Bun (Client Static Preview)',
    timestamp: new Date().toISOString()
  }))

  // Servidor de estáticos precompilados en dist/ con fallback SPA
  .get('*', ({ request }) => {
    const url = new URL(request.url);
    const decodedPath = decodeURIComponent(url.pathname);
    const cleanPath = decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, '');
    const localFilePath = join('dist', cleanPath);

    if (existsSync(localFilePath) && !localFilePath.endsWith('/')) {
      return Bun.file(localFilePath);
    }
    // Fallback SPA para index.html
    return Bun.file('dist/index.html');
  })
  .listen(port);

console.log(`🦊 Servidor estático cliente iniciado en http://localhost:${app.server?.port}`);
