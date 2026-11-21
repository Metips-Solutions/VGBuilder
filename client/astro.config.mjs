import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: process.env.SITE_URL || 'https://vgbuilder.app',
  output: 'static',
  integrations: [react()],
  redirects: {
    '/genshin-impact': '/genshin'
  },
  vite: {
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': 'http://localhost:3000',
        '/catalog': 'http://localhost:3000',
        '/inventory': 'http://localhost:3000',
        '/affinity': 'http://localhost:3000'
      }
    }
  }
});
