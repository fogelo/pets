import "./App.css";
import UseState from "./components/hooks/UseState";
import UseRef from "./components/hooks/UseRef";
import UseMemo from "./components/hooks/UseMemo";
import UseCallback from "./components/hooks/UseCallback";
import UseContext from "./components/hooks/hooks/UseContext/UseContext";
import UseReducer from "./components/hooks/UseReducer";
import UseLayoutEffect from "./components/hooks/UseLayoutEffect/UseLayoutEffect";
import Keys from "./components/Keys";

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
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <Keys />
    </>
  );
}

export default App;
