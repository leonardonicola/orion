import '@/app/styles/base.css'

import { createApp } from 'vue'

import App from '@/app/app.vue'
import { router } from '@/app/providers/router'
import { store } from '@/app/providers/store'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
