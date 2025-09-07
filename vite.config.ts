import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true
    },
    proxy: {
      '/api': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false
      },
      '/login': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      '/user': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      '/sign-out': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      '/register': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      '/forgot-password': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      '/reset-password': {
        target: 'https://api.radif.org/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  build: {
    outDir: 'build'
  }
})
