import React, { useEffect, useState } from "react";

/* 
* useEffect — это хук в React, который позволяет выполнять побочные 
* эффекты в функциональных компонентах. Он заменяет методы жизненного 
* цикла классовых компонентов, такие как componentDidMount, 
* componentDidUpdate и componentWillUnmount.

* функция, переданная в useEffect выполняется после рендера


*/

const UseEffect: React.FC = () => {
  //* [] - выполнится один раз при монтировании компонента
  useEffect(() => {
    // Код эффекта
    let aaa = 1;
    const interval = setInterval(() => {
      console.log("Interval running");
      aaa = aaa + 1;
      console.log(aaa);
    }, 1000);

    // выполняется перед размонтирование компонента и перед выполнением следующего
    // эффекта
    return () => {
      // Очистка эффекта (опционально)
      clearInterval(interval); // Очистка интервала
    };
  }, []);

  return <div></div>;
};

export default UseEffect;
