import { createContext, useState } from "react";
import UseContextChild from "./UseContextChild";

export const SomeContext = createContext(0);

const UseContextParent = () => {
  const [value, setValue] = useState(1);
  return (
    <SomeContext.Provider value={value}>
      <div>
        <UseContextChild />
      </div>
      <button onClick={() => setValue(value + 1)}>increment</button>
    </SomeContext.Provider>
  );
};

export default UseContextParent;
