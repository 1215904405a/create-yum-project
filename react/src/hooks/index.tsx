import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * 强制刷新
 */
export const useUpdate = () => {
  const [_, setState] = useState(0);
  return useCallback(() => {
    setState((num: number): number => num + 1);
  }, []);
};

//  新老props值对比
export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; // 异步设值 下一次才会返回新的
  });
  return ref.current;
}

//  离开页面提示
const beforeunloadCallback = (e: any) => {
  const msg = '确认要离开吗？'
  e.returnValue = msg
  return msg
}
export function useBeforeunload() { // 需要的就引用一下
  useEffect(() => {
    window.addEventListener('beforeunload', beforeunloadCallback)
    return () => {
      window.removeEventListener('beforeunload', beforeunloadCallback)
    }
  });
}
