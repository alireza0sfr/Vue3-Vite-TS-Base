import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en from './locales/en.json'
import fa from './locales/fa.json'

const app = createApp(App)

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'fa',
  messages: {
    en,
    fa
  },
})

app.use(i18n)
app.mount('#app')