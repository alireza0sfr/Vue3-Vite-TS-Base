import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import fa from '../locales/fa.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'fa',
  messages: {
    en,
    fa
  },
})

export default i18n