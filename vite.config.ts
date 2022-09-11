/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  test: {
    setupFiles: ['./tests/config.ts'],
    environment: 'jsdom'
  },
  plugins: [vue()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
