import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import { TestIcon } from '@/conf/iconsvg';

export const routes: any[] =
  [
    {
      name: '表单测试',
      path: '/',
      element: Home,
      icon: TestIcon,
    },
  ];

// 将路由打包 (以便做代码分割 实现异步加载)
const HomeRoutes = () => {
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

export default HomeRoutes;
