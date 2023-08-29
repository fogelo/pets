import { useState } from "react";
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
  const [socket, setSocket] = useState(null);
  return (
    <>
      <button
        onClick={() => {
          const socket = new WebSocket("ws://localhost:5001/");
          setSocket(socket);
          socket.onopen = () => {
            console.log("подключение установлено");
          };
          socket.onmessage = (event) => {
            console.log(event.data);
          };
        }}
      >
        connect
      </button>
      <button
        onClick={() => {
          socket.send("hello server");
        }}
      >
        send message
      </button>
    </>
  );
};
