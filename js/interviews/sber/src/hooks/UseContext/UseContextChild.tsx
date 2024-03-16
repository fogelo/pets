import { useContext } from "react";
import { SomeContext } from "./UseContextParent";

const UseContextChild = () => {
  const value = useContext(SomeContext);
  return <>{value}</>;
};

export default UseContextChild;
