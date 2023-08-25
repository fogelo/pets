import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import Toolbar from "./components/Toolbar";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      {/* 
      <Toolbar />
      <SettingsBar />
      <Canvas /> 
      */}
      <WsTest />
    </div>
  );
}

export default App;

const WsTest = () => {
  return (
    <button
      onClick={() => {
        const socket = new WebSocket("ws://localhost:5001/");
        socket.onopen = () => {
          console.log("подключение установлено");
        };
      }}
    >
      connect
    </button>
  );
};
