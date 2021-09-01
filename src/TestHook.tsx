/*
 * @Author: jessLiu
 */

import React, { useState, useMemo } from "react";

export default function WithoutMemo() {
  const [count, setCount] = useState(1);
  const [val, setValue] = useState("");

  /* 
useMemo返回缓存的变量，useCallback返回缓存的函数。
*/
  const expensive = useMemo(() => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <div>
      <h4>
        {count}-{val}-{expensive}
      </h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={(event) => setValue(event.target.value)} />
      </div>
    </div>
  );
}
