/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { i18n } from './i18n'
import { router } from './router'
import vuetify from './vuetify'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app.use(router)
  app.use(vuetify)
  app.use(i18n)
}
