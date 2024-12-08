import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Example of proxying API requests
    },
  },
  base: '/', // Set base path for deployment (optional)
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "@/styles/global.scss";`,  // Global SCSS file (optional)
      },
    },
  },
})