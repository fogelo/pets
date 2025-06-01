import React, { useCallback, useState } from "react";

/* 

useCallback — это хук в React, который используется для мемоизации функций.
Он предотвращает создание новой функции при каждом рендере компонента, 
если зависимости не изменились. Это полезно для оптимизации производительности,
особенно при передаче функций в дочерние компоненты.


const memoizedCallback = useCallback(() => {
  // Ваш код
}, [dependencies]);

- Первый аргумент — это функция, которую нужно мемоизировать.
- Второй аргумент — массив зависимостей. Если зависимости не изменились, 
    useCallback вернет ту же функцию.


Когда использовать:

- Когда функция передается в дочерний компонент, чтобы избежать его 
лишнего рендеринга.
- Когда функция используется в зависимости других хуков, таких как useEffect.

*/

const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

const Parent: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
};

export default Parent;
