import { defineComponent } from 'vue'
import style from './icon.module.less'

// 带render函数的组件 优点：可将逻辑区与模版区分开
export default defineComponent({
  props: {
    type: String,
    onClick: Function
  },
  render() {
    // render函数在响应式数据发生更改时会自动触发（与react类似）
    const { type, onClick }: any = this
    return (
      <svg class={`icon${' ' + style['svg-icon']}`} aria-hidden="true" onClick={onClick}>
        <use xlinkHref={`#${type}`} />
      </svg>
    )
  }
})
