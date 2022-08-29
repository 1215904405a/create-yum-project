import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'
// import foucsDirective from '@/directive/focus'
import '@/assets/iconfont/iconfont.js'; // icon symbol
import Icon from '@/components/icon'
import fastclick from 'fastclick';
// import './globalComponents';
import 'vant/lib/index.css';

const app = createApp(App)
app.component('SymbolIcon', Icon)
// 全局挂载指令
// app.directive('focus', foucsDirective)

// globalComponents(app)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastclick.FastClick.attach(document.body);
  }, false);
}

app.use(router).use(store).mount('#app')