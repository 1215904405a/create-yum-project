import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Iform from './form';
import ReduxExa from './redux';
import { TestIcon } from '@/conf/iconsvg';

export const routes =
  [
    {
      name: '表单测试',
      path: 'form',
      element: Iform,
      icon: TestIcon,
    },
    {
      name: 'mobx',
      path: 'mobx',
      element: ReduxExa,
    },
  ]

// 将路由打包 (以便做代码分割 实现异步加载)
const ExampleRoutes = () => {
  return (
    <Routes>
      {
        routes.map(item => (
          <Route key={item.path as string} path={item.path} element={<item.element />} />
        ))
      }
    </Routes>
  );
};

export default ExampleRoutes;
