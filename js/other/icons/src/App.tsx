import "./App.css";
import burger from "./assets/burger.svg";
// import { ReactComponent as MyIcon } from "./assets/burger.svg";
import Burger from "./assets/burger.svg?react";

function App() {
  return (
    <>
      {/* <img src={burger} alt=""/> */}

      <Burger fill={"red"} />
    </>
  );
}

export default App;
