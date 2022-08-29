// TODO vue3 eslint暂时对jsx ts js有效 对tsx无效   组合式api，更加适合静态分析
import '@/assets/style/base.less'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { Locale } from 'vant';
// 引入英文语言包
import zhCN from 'vant/es/locale/lang/zh-CN';

Locale.use('zh-CN', zhCN);

export default defineComponent({
  setup() {
    return () => (
      <RouterView />
    )
  }
})
