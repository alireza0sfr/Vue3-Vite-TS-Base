import { createApp } from 'vue'

import App from './App.vue'
import i18n from '../src/plugins/localizations'
import pinia from '../src/plugins/pinia'
import router from './plugins/router'
import Logger from './plugins/logger'

const app = createApp(App)

app.config.globalProperties.logger = new Logger()

app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')