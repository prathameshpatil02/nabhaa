import { defineConfig } from 'vite'

// Project site: https://<user>.github.io/nabhaa/
export default defineConfig({
  base: '/nabhaa/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
  },
  preview: {
    port: 4173,
  },
})
