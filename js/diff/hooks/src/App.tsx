import "./App.css";
import UseState from "./components/UseState";
import UseRef from "./components/UseRef";
import UseMemo from "./components/UseMemo";
import UseCallback from "./components/UseCallback";

function App() {
  return (
    <>
      <UseState />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseRef />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseMemo />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseCallback />
    </>
  );
}

export default App;
