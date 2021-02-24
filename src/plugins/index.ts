import { router } from './router'
import { store, key } from './store'
import ElementUI from './element-ui'
import { App } from 'vue'
export default {
  install(vue: App) {
    vue.use(router)
    vue.use(store, key)
    vue.use(ElementUI)
  }
}