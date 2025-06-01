import React, { useState } from "react";


/* 
* useState - базовый хук, принимает начальное значение состояния 
* и возвращает кортеж, в котором состояние и функция, которая это состояние меняет и 
* ее вызов приводить к перерендеру.



*/

// сложное вычисление
const computeExpensiveValue = () => {
  const fiveSecondAfter = Date.now() + 5000;
  while (Date.now() < fiveSecondAfter) {}
  return { name: "anton", height: 180 };
};

const UseState: React.FC = () => {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState({ name: "anton", height: 180 });

  // интерфейс будет заблокирован, пока не будет выполнена функция
  const [expensiveValue, setExpensiveValue] = useState(() =>
    computeExpensiveValue()
  );

  // прибавит сразу 3
  const onIncrementClick = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  // убавит только 1
  const onDecrementClick = () => {
    setCount(count - 1);
    setCount(count - 1);
    setCount(count - 1);
  };

  const changeObj = () => {
    setObj({ ...obj, height: 175 });
  };

  //! вот так просто делать нельзя так как как каждый рендер запустит
  //! новый интервал, нужно иго подчищать в useEffect
  /* 
    setInterval(() => {
    console.log(111);
    setCount((prevCount) => prevCount + 1);
  }, 1000); 
  */

  return (
    <div>
      <button onClick={onDecrementClick}>убавить</button>
      <div>{count}</div>
      <button onClick={onIncrementClick}>добавить</button>

      <div>
        <button onClick={changeObj}>изменить объект</button>
      </div>
    </div>
  );
};

export default UseState;
