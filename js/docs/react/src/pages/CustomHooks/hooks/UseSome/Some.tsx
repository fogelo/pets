import React from "react";
import useSome from "./useSome";

const Some: React.FC = () => {
  const ref = useSome();
  console.log(ref);
  return <div ref={ref}>Пример компонента Some</div>;
};

export default Some;
