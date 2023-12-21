import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAppSelector,
  incremented,
  decremented,
  incrementAsync,
} from "../stroe/store";

const Counter = () => {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  return (
    <>
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
};

export default Counter;
