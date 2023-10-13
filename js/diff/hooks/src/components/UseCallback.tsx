import { useCallback, useEffect, useMemo, useState } from "react";

/* 

Проблема в том мы не хотим, чтобы в Items отрабатывал useEffect при каждом рендере компонента UseCallback, а это происходит будет
поскольку при каждом рендере создается новая функция increment. Но нам не нужна каждый раз новая функция, вполне можно использовать 
ту что была создана на предыдущем шаге рендера. Поэтому мы при помощи useCallback можем сохранить функцию ии не создавать ее 
каждый раз заново, что позволит оптимизировать код.

*/

const UseCallback = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  // тоже самое можно сделать и при помощи useMemo
  /*   
    const increment = useMemo(() => {
    return () => {
      setCount(count + 1);
    };
  }, [count]);
 */

  return (
    <>
      <div>Счетчик: {count}</div>
      <button onClick={increment}>Добавить</button>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Items increment={increment} />
    </>
  );
};

const Items = ({ increment }) => {
  useEffect(() => {
    console.log("increment");
  }, [increment]);

  return <div>items</div>;
};

export default UseCallback;
