/* 
useRef — это хук в React, который позволяет создавать изменяемый объект, 
сохраняющийся между рендерами компонента. Он часто используется для
доступа к DOM-элементам или хранения данных, которые не вызывают 
повторного рендера при изменении.


Изменение ref.current не вызывает повторного рендера компонента.
*/

import { useEffect, useRef } from "react";

export const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus(); // Устанавливаем фокус на input
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

const RenderCounter: React.FC = () => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1; // Увеличиваем счетчик при каждом рендере
  });

  return <div>Render Count: {renderCount.current}</div>;
};

export default RenderCounter;
