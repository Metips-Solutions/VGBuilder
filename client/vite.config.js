import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/catalog': 'http://localhost:3000',
      '/inventory': 'http://localhost:3000',
      '/affinity': 'http://localhost:3000'
    }
  }
});
