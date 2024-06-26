/**
 * wangyong 2024-6-07
 * 入口
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import {onLCP, onINP, onCLS} from 'web-vitals';
import App from './App';
// import './serviceWorker'; // TODO: pwa
// import { getAllComponents } from 'reactyumcom/src/edit/parser/main'; // TODO: 模块解析
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';
import './less/index.less';

// window.allComponents = getAllComponents();

// 性能检测
// function logDelta({ name, id, delta }: any) {
//   let mes = ''
//   if (name === 'LCP') {
//     mes = 'Largest Contentful Paint (LCP应该在2.5秒内): '
//   } else if (name === 'FID') {
//     mes = 'First Input Delay (FID应该在100毫秒内): '
//   } else if (name === 'CLS') {
//     mes = 'Cumulative Layout Shift (CLS应该小于0.1): '
//   }
//   window.console.log(mes);
//   window.console.log(`${name} matching ID ${id} changed by ${delta}`);
// }
if (process.env.NODE_ENV === 'development') {
  onCLS(console.log);
  onINP(console.log);
  onLCP(console.log);
}
// requestAnimationFrame(() => { 
const root = createRoot(document.getElementById('app') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
//   })
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
