/* 

useRef предназначени для хранения состояния,как и useState 

Чтобы отобразить на странице компонент с его новым состоянием нужно, чтобы реакт перевызвал компонент. И есть в в связи с этим
проблема, что при каждом рендеринге компонента все переменные пересоздаются. И useRef позволяет создать переменную вне компонента,
что позволяет ей не зависеть от перерендеринга. 
useRef - использовать ссылку, мы просим реакт сохранить какое-то значения вне компоненты, чтобы каждый рендеринг не 
приводил к созданию переменной заново.
*/

import { useEffect, useRef, useState } from "react";

let outsideValue = 0;

const UseRef = () => {
  const count = useRef(0);

  let innerValue = 0;

  const [state, setState] = useState(0);
  const prevState = useRef(0); // позволяет так же хранить предыдущее состояние

  const increment = () => {
    innerValue++;
    outsideValue++;
    count.current = count.current + 1;
    setState(state + 1);
  };

  useEffect(() => {
    prevState.current = state;
  }, [state]);

  return (
    <>
      <div>Счетчик ref: {count.current}</div>
      <div>Счетчик innerValue: {innerValue}</div>
      <div>Счетчик outsideValue: {outsideValue}</div>
      <div>Счетчик prevState: {prevState.current}</div>
      <button onClick={increment}>Добавить</button>
    </>
  );
};

export default UseRef;

/* 
?Вопросы:
?innerValue не будет меняться на странице, а count.current и outsideValue будет. Почему

*/
