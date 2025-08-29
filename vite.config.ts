import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cabv2-all-in-1/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})