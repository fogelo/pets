import "./App.css";
import PromiseComp from "./async/PromiseComp";
import UseContextParent from "./hooks/UseContext/UseContextParent";
import UseReducer from "./hooks/UseReducer";
import UseCallbackParent from "./hooks/useCallbackParent";
import UseMemo from "./hooks/useMemo";

function App() {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ];

  return (
    <>
      <UseReducer />
      <UseContextParent />
      <UseCallbackParent />
      <UseMemo users={users} />

      <PromiseComp/>
    </>
  );
}

export default App;
