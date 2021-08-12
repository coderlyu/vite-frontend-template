import { createApp } from 'vue'
import App from './App.vue'

// style
import './assets/css/base.css'
import './assets/iconfont/iconfont.css'
import 'nprogress/nprogress.css'
import 'element-plus/lib/theme-chalk/display.css'
import 'element-plus/lib/theme-chalk/index.css'

// plugins
import plugins from './plugins'

createApp(App)
.use(plugins)
.mount('#app')
