import React from 'react';

import Counter from './components/counter'
// 导入管理 Counter 组件的 Store
// import CounterStore from '@/stores/counter/counterStore'
// 创建管理 Counter 组件的 Store 实例对象
// const counterStore = new CounterStore()

function ReduxExa() {
  // 调用 Counter 组件并传入管理其状态的 Store
  return <Counter />
}

export default ReduxExa
