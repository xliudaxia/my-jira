import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

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
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => () => {});
  //eslint-disable-next-line react-hooks/exhaustive-deps
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
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请输入promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState({ ...state, stat: "loading" });
      return (
        promise
          .then((data) => {
            if (mountedRef) {
              setData(data);
            }
            return data;
          })
          //catch会笑话异常，如果不想被消化则需要手动抛出
          .catch((error) => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error);
            return error;
          })
      );
    },
    [config.throwOnError, mountedRef, setData, state]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucces: state.stat === "success",
    run,
    setData,
    setError,
    //重新跑一遍run方法
    retry: retry,
    ...state,
  };
};
