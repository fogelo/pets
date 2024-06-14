import {useState} from "react";
import "./App.css";
import Print from "./components/Print";
import PDF from "./components/PDF";
import A from "./components/A/A";
import B from "./components/B/B";
import C from "./components/C/C.jsx";

function App() {
    const vads = "hello"
    return (
        <>
            {/* <Print /> */}
            {/* <PDF /> */}
            {/* <A /> */}
            {/* <B /> */}
            <C/>
        </>
    );
}

export default App;
