import { useState } from "react";

/* 

Проблема производительности. Если key не указывается, то будет перерисован весь список. Проблема возникает когда меняется порядок элементов в 
массиве. Например добавляется новый элемент в начало и все индексы смещаются. Для реакта если для key указан index, то при добавлении нового элемента
в начало при следующем рендере все key изменятся, и соответственно реакт справедливо посчитает, что ему нужно обновить список полностью

? Что такое key и зачем нужен?
? Почему не рекомендуется использовать в качестве ключей индексы массивов?

Здесь нужно упоминуть про RealDom и VirtualDom и reconcilation. Вместо того чтобы генерировать ключи "на лету", вам следует включать их в свои данные:

*/

const Keys = () => {
  const [state, setState] = useState([
    { id: 1, name: "dog" },
    { id: 2, name: "cat" },
    { id: 3, name: "cat" },
    { id: 4, name: "cat" },
  ]);

  const add = () => {
    // setState([...state, { id: new Date().getTime(), name: "rabbit" }]);
    setState([{ id: new Date().getTime(), name: "rabbit" }, ...state]);
  };
  const deleteElement = () => {
    setState(state.filter((item) => item.id !== 3));
  };

  return (
    <>
      <ul>
        {state.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
      <button onClick={add}>Добавить элемент</button>
      <button onClick={deleteElement}>Удалить элемент</button>
    </>
  );
};

export default Keys;
