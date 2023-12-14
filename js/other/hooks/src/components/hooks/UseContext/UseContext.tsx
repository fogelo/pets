/* 
Проблема в том, что не всегда компфортно выностить состояние в родительскую компоненту компонент,в которых это состояние требуется.
Особенно если есть большая вложенность прокидывать пропсы неудобно. Соответственно нужнен какой-то механизм и реакте эту проблему решают 
с помощью React.createContext() и useContext.

контекст - это просто глобальный стор, на который мы можем подписаться. 

UseContext нужен, чтобы не прокидывать пропсы, получать доступ к данным через контекст. 
Контекст позволяет передавать данные вглубь. Без явной передачи пропсов.


Контексты принято выносить в отдельный файл и из него импортировать. 
*/

import React, { useState } from "react";
import Button from "./Button";
import Form from "./Form";
import "./style.css";

export const ThemeContext = React.createContext("white");

const UseContext = () => {
  const [theme, setTheme] = useState("white");
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Form />
      </ThemeContext.Provider>
      <Button onClick={() => setTheme(theme === "white" ? "dark" : "white")}>
        Изменить тему
      </Button>
    </>
  );
};

export default UseContext;
