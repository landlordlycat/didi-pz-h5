import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import api from '@/plugins/provide'
import { getItem } from './utils/localStorage'
import { State } from './states'
const app = createApp(App)

router.beforeEach((to, from) => {
  const token = getItem(State.H5_TOKEN)
  if (token) {
    if (to.path === '/login') {
      return { path: '/' }
    }
    return true
  } else {
    if (to.path === '/login') {
      return true
    }

    return { path: '/login' }
  }
})

app.use(api)
app.use(createPinia())
app.use(router)

app.mount('#app')
