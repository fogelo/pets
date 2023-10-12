import { useState } from "react";
import "./App.css";
import UseState from "./components/UseState";
import UseRef from "./components/UseRef";

function App() {
  return (
    <>
      <UseState />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseRef />
    </>
  );
}

export default App;
