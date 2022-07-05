import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'
// import foucsDirective from '@/directive/focus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
// 全局挂载指令
// app.directive('focus', foucsDirective)s
app.use(router).use(store).mount('#app')
