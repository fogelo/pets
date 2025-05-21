import { Route, Routes } from "react-router";
import "./App.css";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
