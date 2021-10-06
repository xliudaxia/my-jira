/*
 * @Author: jessLiu
 */

import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//在函数里，最好不要改变传入的对象
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

//hook最大的特征是在里面会用到其他hook（官方的）
export const useDebounce = <V>(value: V, delay?: number) => {
  //初始化一个存储debounce参数的state
  const [debouncedValue, setDebouncedValue] = useState(value);
  //每次在value和delay变化后设置一个定时器
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //每次在上一个useEffect处理完以后再运行（清理的时候执行）
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  return () => {
    if (!keepOnUnmount) {
      document.title = oldTitle;
    }
  };
};

export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
