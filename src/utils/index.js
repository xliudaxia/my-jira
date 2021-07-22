/*
 * @Author: jessLiu
 */

import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
//在函数里，最好不要改变传入的对象
export const cleanObject = (object) => {
  console.log("传递的对象", object);
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
