import { useState } from "react";

/* 
  useState возвращает кортеж 
*/

//функция если нужно вычислить начальное значение для count
const computeInitialCounter = () => {
  console.log("calc random");
  return Math.trunc(Math.random() * 10);
};

function UseState() {
  /* ========== Хранение примитвного значения ============= */
  const [count, setCount] = useState(computeInitialCounter);

  const increment = () => {
    //вот так будет прибавлять все равно по одному
    /*    
    setCount(count + 1);
    setCount(count + 1); 
    */

    // а вот так уже по 2 значения
    setCount((prevCount) => {
      return prevCount + 1;
    });
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      return prevCount - 1;
    });
  };

  /* =========== Вот так можно хранить и изменять при помощи useState объекты============ */

  const [state, setState] = useState({
    title: "Заголовок1",
    date: new Date(),
  });

  const updateTitle = () => {
    setState((prevState) => {
      return {
        ...prevState,
        date: new Date(),
      };
    });
  };

  return (
    <>
      <h2>Счетчик: {count}</h2>
      <button onClick={increment}>Добавить</button>
      <button onClick={decrement}>Убавить</button>
      <h2>{JSON.stringify(state)}</h2>
      <button onClick={updateTitle}>Обновить дату</button>
    </>
  );
}

export default UseState;
