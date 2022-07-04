// 全局公用声明 ——王永
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

// action 公用 type 和 interface区别 https://www.jqhtml.com/24056.html
declare interface Action {
  type: string;
  payload: any
}
  
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png'

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less'

declare interface Window { // 全局变量
  less: any;
  crumbs: Array<any>;
  allComponents: any;
  _FRENV_: string;
}

declare module 'reactyumcom/src/edit/parser/main'

declare const _FRENV_: string
