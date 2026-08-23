import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@sections': path.resolve(__dirname, 'src/components/sections'),
      '@three': path.resolve(__dirname, 'src/components/three'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@animations': path.resolve(__dirname, 'src/animations'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',   // explicit IPv4 — avoids ECONNREFUSED ::1
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three'
            if (id.includes('gsap')) return 'gsap'
            if (id.includes('framer-motion')) return 'framer'
            if (id.includes('react') || id.includes('axios')) return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
