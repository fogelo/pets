/*
* useMemo — это хук в React, который используется для мемоизации вычисленных
* значений. Он предотвращает повторное выполнение дорогостоящих вычислений, 
* если зависимости не изменились. Это полезно для оптимизации производительности, 
* особенно в случаях, когда вычисления зависят от сложных данных.

const memoizedValue = useMemo(() => computeExpensiveValue(), [dependencies]);

*/

import { useMemo, useState } from "react";

const ExpensiveComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value...");
    return count * 2; // Пример сложного вычисления
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default ExpensiveComponent;
