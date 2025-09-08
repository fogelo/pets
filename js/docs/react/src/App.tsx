import { Routes, Route } from "react-router";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import ReactHooks from "./pages/ReactHooks";
import CustomHooks from "./pages/CustomHooks/CustomHooks";

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
