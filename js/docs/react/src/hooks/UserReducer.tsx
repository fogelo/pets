import React, { useEffect, useReducer, useState } from "react";

/* 
* useEffect — это хук в React, который позволяет выполнять побочные 
* эффекты в функциональных компонентах. Он заменяет методы жизненного 
* цикла классовых компонентов, такие как componentDidMount, 
* componentDidUpdate и componentWillUnmount.

* функция, переданная в useEffect выполняется после рендера
*/

type Action = { type: "increment" } | { type: "decrement" };
type State = { count: number };

const initialState = { count: 0 };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count + 1 };
    default:
      throw new Error();
  }
};

const UseEffect: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button onClick={() => dispatch({ type: "decrement" })}>убавить</button>
      <div>{state.count}</div>
      <button onClick={() => dispatch({ type: "increment" })}>добавить</button>
    </div>
  );
};

export default UseEffect;
