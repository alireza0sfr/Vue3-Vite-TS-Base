import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'
import en from './locales/en.json'
import fa from './locales/fa.json'
import './style.css'

import Logger from './plugins/logger'

const app = createApp(App)
const pinia = createPinia()

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'fa',
  messages: {
    en,
    fa
  },
})

app.config.globalProperties.logger = new Logger()

app.use(i18n)
app.use(pinia)
app.mount('#app')