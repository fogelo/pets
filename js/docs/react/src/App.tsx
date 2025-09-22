import { Routes, Route, Link, Outlet } from "react-router";
import "./App.css";
import ReactHooks from "./pages/ReactHooks";
import CustomHooks from "./pages/CustomHooks/CustomHooks";
import { ThemeProvider } from "./context/ThemeContext";

//--------------
function App() {
  return (
    <ThemeProvider>
      <header>
        <nav>
          <Link to="/react-hooks">React Hooks</Link>
          <Link to="/custom-hooks">Custom Hooks</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;

