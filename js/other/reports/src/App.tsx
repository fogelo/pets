import "./App.css";
import OdsUploader from "./components/OdsUploader.tsx";
import Odt from "./components/Odt.tsx";
import Ods from "./components/Ods.tsx";
import { OdsImage } from "./components/OdsImage.tsx";
import { OdtImage } from "./components/OdtImage.tsx";
import OdtComponent from "./components/OdtComponent.tsx";
import OdtTable from "./components/OdtTable.tsx";
import OdtTemplate from "./components/odt-template/OdtTemplate.tsx";
import PdfViewer from "./components/pdf-dist/PdfDist.tsx";

function App() {
  return (
    <>
      {/*<OdsUploader/>*/}
      {/*<Odt/>*/}
      {/*<Ods/>*/}
      {/*<OdsImage/>*/}
      {/*<OdtImage/>*/}
      {/*<OdtComponent/>*/}
      {/*<OdtTable/>*/}
      {/* <OdtTemplate/> */}
      <PdfViewer />
    </>
  );
}

export default App;
