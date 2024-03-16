import { useReducer } from "react";

const reducer = (state: any, action: { type: string }) => {
  if (action.type === "increment_age") {
    return { ...state, age: state.age + 1 };
  }
};

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, { age: 32 });
  console.log(state);
  return (
    <>
      <div>{state.age}</div>
      <button onClick={() => dispatch({ type: "increment_age" })}>
        increment
      </button>
    </>
  );
};

export default UseReducer;
