// observer: 监控当前组件使用到的由 MobX 跟踪的 observable state, 当状态发生变化时通知 React 更新视图
import React from 'react';
import { observer } from 'mobx-react' // mobx-react-lite
import { Button } from 'antd';

function Counter({ counterStore }: any) {
  return (
    <div>
      <p className="paragraph">{counterStore.count}</p>
      <Button onClick={() => counterStore.increment()} className="button m-r-20">加 1</Button>
      <Button type='primary' onClick={() => counterStore.reset()} className="button">重置</Button>
    </div>
  )
}

export default observer(Counter)