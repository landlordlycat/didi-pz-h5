import type { App } from 'vue'
import api from '@/server/h5'

export default {
  install: (app: App) => {
    app.provide('api', api)
  }
}
