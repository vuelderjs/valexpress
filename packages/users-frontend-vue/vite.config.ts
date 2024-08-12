import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import graphqlLoader from 'vite-plugin-graphql-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphqlLoader()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@valexpress/users-frontend-vue',
      fileName: (format: string) => `valexpress-users-frontend-vue.${format}.js`,
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
