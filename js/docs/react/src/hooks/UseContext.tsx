import { useContext, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";

/*
 * useContext — это хук в React, который позволяет функциональным компонентам
 * получать доступ к данным из контекста. Он упрощает передачу данных через
 *  дерево компонентов, избегая необходимости пробрасывать пропсы на каждом
 *  уровне.
 */

/* 
Когда использовать 
1. Глобальное состояние и избежание пробросов пропсов (пропс дрилинг):
    Для управления состоянием, которое нужно передавать через несколько
    уровней компонентов (например, тема, язык, аутентификация).
*/

/* 
1. Создали контекст /context/ThemeContext.tsx
2. Создали комонент Provider, в который будем оборачивать 
3. Создаем компонент, которому нужен контекст и чтобы его получить используем 
    хук useContex(TheneContext)


Чтобы менять контекст можно использовать useState или useReducer
*/

// демонстрация хука useContext
const ThemedComponent: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme);

  useEffect(() => {
    setTimeout(() => {
      setTheme("purple");
    }, 3000);
  }, [setTheme]);
  return <div>Current theme: {theme}</div>;
};

export default ThemedComponent;
