import React from 'react';
import { Route } from 'react-router-dom';
import Home from './home';
import { TestIcon } from '@/conf/iconsvg';

export const routes =
  [{
    name: 'home',
    icon: TestIcon,
    path: '/home',
    children: [
      {
        name: '表单测试',
        path: '/home',
        element: Home,
        icon: TestIcon,
      },
    ]
  }]

// 将路由打包 (以便做代码分割 实现异步加载)
const Routes = () => {
  return (
    <React.Fragment>
      {
        routes[0].children.map(item => (
          <Route key={item.path as string} path={item.path} element={<item.element />} />
        ))
      }
    </React.Fragment>
  );
};

export default Routes;
