import { useEffect, useMemo, useState } from "react";

/* 
    Проблема здесь в том, что когда мы рендерим компонент у нас производятся все вычисления даже если они нам не нужны сейчас.
    И это приводит к лишним тратам ресурсов.  Есть 2 состояния value и color, когда меняем value нам нужно вычислить computed, что 
    занимает некотрое время. Но когда меняем color нам вычисление computed не требуется, как как оно остаотся без изменений, то 
    есть значение computed можно взять из предыдущего рендера.

    Эту проблему можно решить используя хук useMemo, useMemo как и useEffect принимает колбек и массив зависимостей, когда 
    меняется значение указанное в массиве, то вызывается переданный в useMemo колбек.

    useMemo принимает колбек и массив зависимостей, и проверяет равно ли например value на этом шаге рендера с value на 
    предыдущем, если равно, то просто возвращает значение, которое было вычеслено на предыдущем шаге. Если не равно то производит 
    вычисление и возвращает новое значение.

    - метод memo нужен для того чтобы заново не рендерить компонент если его пропсы, сосотояние или конекст не изменились. Этот метод дополняет 
    useMemo и useCallback
    const Greeting = memo(function Greeting({ name }) {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{name && ', '}{name}!</h3>;
});
*/

const complexCompute = (value) => {
  let i = 0;
  while (i < 1000000000) {
    i++;
  }
  return value;
};

const UseMemo = () => {
  const [value, setValue] = useState(0);
  const [color, setColor] = useState("#a14545");

  const increment = () => {
    setValue(value + 1);
  };

  const changeColor = (event) => {
    setColor(event.target.value);
  };

  const computed = useMemo(() => complexCompute(value), [value]);

  //не забывать,что если хранить объекты без useMemo, то useEffect будет отрабатывать при каждом рендере компонента, так как
  // на каждом рендере будет создаваться новый объект
  //   const object = { color };
  const object = useMemo(() => ({ color }), [color]);

  useEffect(() => {
    console.log("object");
  }, [object]);

  return (
    <>
      <div>Count: {computed}</div>
      <button onClick={increment} style={{ background: color }}>
        Добавить
      </button>
      <input type="color" value={color} onChange={changeColor} />
    </>
  );
};

export default UseMemo;
