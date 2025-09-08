import { Routes, Route } from "react-router";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import CustomHooks from "./pages/CustomHooks";
import ReactHooks from "./pages/ReactHooks";

//--------------
function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* react хуки */}
        <Route path="/react-hooks" element={<ReactHooks />} />
        {/* кастомные хуки */}
        <Route path="/custom-hooks" element={<CustomHooks />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
