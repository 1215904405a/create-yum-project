import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Iform from './form';
import { TestIcon } from '@/conf/iconsvg';

export const routes =
  [
    {
      name: '表单测试',
      exact: true,
      path: 'form',
      element: Iform,
      icon: TestIcon,
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
