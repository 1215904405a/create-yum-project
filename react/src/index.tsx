
/**
 * 王永 2021-1-07
 * 入口
 */
// https://babeljs.io/docs/en/babel-polyfill#docsNav
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { getCLS, getFID, getLCP } from 'web-vitals';
import App from './App';
import store from '@/store';
// import './serviceWorker'; // TODO: pwa
// import { getComponents } from 'src/page/main' TODO: 模块解析
import { getParams } from './utils';
import './less/index.less';

const sParams: any = location.hash.split('?').length > 1 ? getParams(location.hash.split('?')[1]) : {}
const date = new Date();
const expiresDays = 1;
date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
sParams.cid && (document.cookie = `cid=${sParams.cid};path=/;expires=${date.toUTCString()}`);  //设置cookie
sParams.JSESSIONID && (document.cookie = `JSESSIONID=${sParams.JSESSIONID};path=/dmis;expires=${date.toUTCString()}`);

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

// getComponents()
if (process.env.NODE_ENV === 'production' && !location.hash.split('?')[0].match('cover')) {
  window.addEventListener('beforeunload', e => {
    const msg = '确认要离开吗？'
    e.returnValue = msg
    return msg
  }, false)
}
// else {
//   getCLS(logDelta);
//   getFID(logDelta);
//   getLCP(logDelta);
// }

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('app') as HTMLElement
);

// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();