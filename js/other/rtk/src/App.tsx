import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  decremented,
  incrementAsync,
  incremented,
  useAppSelector,
} from "./store/store";
import { useState } from "react";

function App() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>count is {value}</div>
        <button onClick={() => dispatch(incremented({ value: 1 }))}>
          увеличить на 1
        </button>
        <button onClick={() => dispatch(decremented({ value: 1 }))}>
          уменьшить на 1
        </button>
        <button onClick={() => dispatch(incrementAsync({ value: amount }))}>
          увеличить на заданное число
        </button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
    </>
  );
}

export default App;
