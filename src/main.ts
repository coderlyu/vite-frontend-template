import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router'
import ElementUI from './plugins/element-ui'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App)
.use(store, key)
.use(router)
.use(ElementUI)
.mount('#app')
