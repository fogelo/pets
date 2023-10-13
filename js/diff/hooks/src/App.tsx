import "./App.css";
import UseState from "./components/UseState";
import UseRef from "./components/UseRef";
import UseMemo from "./components/UseMemo";
import UseCallback from "./components/UseCallback";
import UseContext from "./components/UseContext/UseContext";
import UseReducer from "./components/UseReducer";
import UseLayoutEffect from "./components/UseLayoutEffect/UseLayoutEffect";

function App() {
  return (
    <>
      {/* <UseState />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseRef />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseMemo />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseCallback />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseContext />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseReducer /> */}
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseLayoutEffect />
    </>
  );
}

export default App;
