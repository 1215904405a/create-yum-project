import React, { Suspense } from 'react'; // todo 脚本生成
// import loadable from '@loadable/component'; // 建议用react自己的code-splitting https://reactjs.org/docs/code-splitting.html#reactlazy
import Loading from 'components/loading';

const HomeRoutes = React.lazy(() => import(/* webpackChunkName: "home" */ '@/modules/home'))
let routes: any[] = [
  {
    path: '/*',
    element: <Suspense fallback={<Loading />}><HomeRoutes /></Suspense>,
  },
];

if (_FRENV_ === 'dev') {
  const ExampleRoutes = React.lazy(() => import(/* webpackChunkName: "example" */ '@/modules/example'))
  routes = routes.concat([{
    path: 'example/*',
    element: <Suspense fallback={<Loading />}><ExampleRoutes /></Suspense>,
  }]);
}

export default routes;
