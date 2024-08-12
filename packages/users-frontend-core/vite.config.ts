import { defineConfig } from 'vite';
import { resolve } from 'path'
import graphqlLoader from "vite-plugin-graphql-loader";

export default defineConfig({
  plugins: [graphqlLoader()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@valexpress/users-frontend-core',
      fileName: (format: string) => `valexpress-users-frontend-core.${format}.js`,
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