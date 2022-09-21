/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { loadEnv } from 'vite'



export default defineConfig(({ mode }) => {
  
  const ENV_DIR = '/envs'
  const ENV_VARS = loadEnv(mode, process.cwd() + ENV_DIR)
  
  return {
    test: {
      setupFiles: ['./tests/config.ts'],
      environment: 'jsdom'
    },
    envDir: ENV_DIR,
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/install.ts'),
        name: 'vite-ts',
        formats: ['es'],
        fileName: (format) => `vite-ts.${format}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: 'named',
          globals: {
            'vue': 'Vue',
          }
        }
      },
    },
    plugins: [
      vue({
        // @ts-ignore
        style: true,
        css: true
      }),
      vueI18n({
        include: path.resolve(__dirname, './src/locales/**.json'),
        globalSFCScope: true,
        compositionOnly: false,
      }),
    ],
    server: {
      port: 8080
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})