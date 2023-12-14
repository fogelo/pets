/* 
основная задача useSyncExternalStore - это помочь сторонним библиотекам интегрировать свои сторы в реакт. Самая известная redux.
*/

import { useSyncExternalStore } from "react";
import { counterStore } from "./store";

const UseSyncExternalStore = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>Добавить</button>
      <button onClick={decrement}>Убавить</button>
    </div>
  );
};

export default UseSyncExternalStore;

// используя useSyncExternalStore
// const useCounter = () => {
//   const count = useSyncExternalStore(
//     counterStore.subscribe,
//     counterStore.getState
//   );
//   return {
//     count,
//     increment: () => counterStore.setState(count + 1),
//     decrement: () => counterStore.setState(count - 1),
//   };
// };

// не используя useSyncExternalStore