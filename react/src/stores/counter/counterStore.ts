// Counter
import { makeAutoObservable } from 'mobx'

class CounterStore {
  // 数值状态
  count = 1
  constructor() {
    // 将参数对象中的属性设置为 observable state
    // 将参数对象中的方法设置为 action
    makeAutoObservable(this)
  }
  // 使数值状态加一
  increment() {
    this.count += 1
  }
  // 重置数值状态
  reset() {
    this.count = 0
  }
}

export default CounterStore