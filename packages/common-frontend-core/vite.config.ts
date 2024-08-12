import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: '@valexpress/common-frontend-core',
        fileName: (format: string) => `valexpress-common-frontend-core.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  })