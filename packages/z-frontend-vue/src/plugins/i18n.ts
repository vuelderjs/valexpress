import { createI18n } from "vue-i18n";
import merge from 'deepmerge'

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: "es",
  messages: {...merge.all([])}
});