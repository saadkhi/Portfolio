import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/admin': 'http://127.0.0.1:8000',
      '/static/admin': 'http://127.0.0.1:8000',
      '/media': 'http://127.0.0.1:8000',
    }
  }
})
