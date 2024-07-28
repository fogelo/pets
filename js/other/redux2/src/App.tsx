import { useState } from "react";
import "./App.css";
import Provider from "./store/Provider";
import { store } from "./store/store";
import Users from "./components/Users";

function App() {
  const [count, setCount] = useState(0);
  const observer = new Observer();
  return (
    <>
      <Provider store={store}>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <Users />
      </Provider>
    </>
  );
}

export default App;
