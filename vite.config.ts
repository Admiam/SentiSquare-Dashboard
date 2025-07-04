// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/textrazor': {
        target: 'https://api.textrazor.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/textrazor/, ''),
      },
    },
  },
})
