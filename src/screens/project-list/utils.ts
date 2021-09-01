import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

/*
 * @Author: jessLiu
 */
// 项目列表搜索参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};
