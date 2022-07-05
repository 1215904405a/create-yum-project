// TODO vue3 eslint暂时对jsx ts js有效 对tsx无效   组合式api，更加适合静态分析
import '@/assets/base.less'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    return () => (
      <ElConfigProvider locale={zhCn}>
        <RouterView />
        
      </ElConfigProvider>
    )
  }
})
