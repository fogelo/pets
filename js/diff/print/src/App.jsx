import { useState } from "react";
import "./App.css";
import Print from "./components/Print";
import PDF from "./components/PDF";
import A from "./components/A/A";
import B from "./components/B/B";
function App() {
  return (
    <>
      {/* <Print /> */}
      {/* <PDF /> */}
      {/* <A /> */}
      {/* <B /> */}
      <div className="div">
        <table>
          <thead>
            <tr>
              <td>111</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                  222 lorem100 Start editing to see some magic happenStart
                  editing to see some magic happenStart editing to see some
                  magic happenStart editing to see some magic happen 222
                  lorem100 Start editing to see some magic happenStart editing
                  to see some magic happenStart editing to see some magic
                  happenStart editing to see some magic happen

              </td>
              {/* <td>222</td> */}
            </tr>
            <tr>
              <td>333</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
