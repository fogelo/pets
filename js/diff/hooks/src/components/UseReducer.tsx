import { useId, useReducer } from "react";

/* 

useReducer - хук для работы с состоянием, вглядит так const [store, dispatch] = useReducer(reducer, initialStore)
где store - это объект в котром хранятся данные, а reducer - это фукнция для изменения этих данных. 
reducer(store, action) {switch(action.type) {
    case "add": ...
    ...
}}
*/

const reducer = (store, action) => {
  console.log(action, store);

  switch (action.type) {
    case "add":
      return { ...store, users: [...store.users, action.user] };
    case "delete":
      return { ...store, users: store.users.filter((u) => u.id !== action.id) };
    default:
      return store;
  }
};

const initialStore = {
  theme: "white",
  users: [
    { id: 1, name: "anton" },
    { id: 2, name: "mary" },
  ],
};

const UseReducer = () => {
  const [store, dispatch] = useReducer(reducer, initialStore);

  return (
    <div>
      {store.users?.map((u, i) => (
        <div key={i}>
          {u.name}
          <button onClick={() => dispatch({ id: u.id, type: "delete" })}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UseReducer;
