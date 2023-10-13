import { useContext } from "react";
import { ThemeContext } from "./UseContext";

const Form = () => {
  const theme = useContext(ThemeContext);
  console.log(theme);

  return (
    <div className={`form ${theme}`}>
      <button>Войти</button>
      <button>Выйти</button>
    </div>
  );
};

export default Form;
