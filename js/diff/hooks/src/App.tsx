import "./App.css";
import UseState from "./components/UseState";
import UseRef from "./components/UseRef";
import UseMemo from "./components/UseMemo";

function App() {
  return (
    <>
      <UseState />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseRef />
      <div style={{ borderBottom: "1px solid", margin: "5px 0" }}></div>
      <UseMemo />
    </>
  );
}

export default App;
