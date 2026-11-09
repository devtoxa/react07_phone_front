import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your React dev server port (default)
    proxy: {
      // Any request starting with /api will be forwarded to Spring Boot
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Optional: remove /api prefix if your Spring Boot controllers don't use it
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})