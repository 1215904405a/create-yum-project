import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/loading';

let routes: any[] = [
  {
    path: '/home',
    element: loadable(() => import(/* webpackChunkName: "home" */ '@/modules/home'), {
      fallback: <Loading />,
    }),
  },
];

if (_FRENV_ === 'dev') {
  routes = routes.concat([{
    path: '/example',
    element: loadable(() => import(/* webpackChunkName: "example" */'modules/example'), {
      fallback: <Loading />,
    }),
  }]);
}

export default routes;
