import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请输入promise类型数据");
    }
    //这一步是让stat变成loading状态
    setState({ ...state, stat: "loading" });
    return (
      promise
        .then((data) => {
          setData(data);
          return data;
        })
        //catch会笑话异常，如果不想被消化则需要手动抛出
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        })
    );
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucces: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
