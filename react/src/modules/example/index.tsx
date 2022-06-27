import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Iform from './form';
import { TestIcon } from '@/conf/iconsvg';

export const routes =
  [{
    name: 'demo',
    icon: TestIcon,
    path: '/example',
    children: [
      {
        name: '表单测试',
        exact: true,
        path: '/example/form',
        element: Iform,
        icon: TestIcon,
      },
    ]
  }]

// 将路由打包 (以便做代码分割 实现异步加载)
const Routes = () => {
  return (
    <Fragment>
      {
        routes[0].children.map(item => (
          <Route key={item.path as string} path={item.path} element={<item.element />} />
        ))
      }
    </Fragment>
  );
};

export default Routes;
