import { ReactNode } from "react";
import "./App.css";
import UseEffect from "./hooks/UseEffect";
import UseState from "./hooks/UseState";
import { ThemeProvider } from "./context/ThemeContext";
import ThemedComponent from "./hooks/UseContext";

//--------------
function App() {
  return (
    <ThemeProvider>
      <div>
        {/* <UseState /> */}
        {/* <UseEffect /> */}
        <ThemedComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;

