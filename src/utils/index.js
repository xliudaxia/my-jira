/*
 * @Author: jessLiu
 */

import { useEffect, useState, useRef } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
//在函数里，最好不要改变传入的对象
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

//hook最大的特征是在里面会用到其他hook（官方的）
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  //每次在value变化后设置一个定时器，

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useDocumentTitle = (title, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  // const oldTitle = document.title;
  useEffect(() => {
    console.log("渲染时", title);
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        console.log("卸载时", oldTitle);
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};
