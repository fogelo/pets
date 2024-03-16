import { memo, useCallback, useState } from "react";

const UseCallbackChild = memo(({ fun }) => {
  console.log("child", fun);

  return <></>;
});

const UseCallbackParent = () => {
  const [state, setState] = useState(1);

  // const fun = () => {};
  const fun = useCallback(() => {
    console.log("usecallback");
  }, []);
  return (
    <div>
      <UseCallbackChild fun={fun} />
      <button onClick={() => setState(state + 1)}>{state}</button>
    </div>
  );
};

export default UseCallbackParent;
