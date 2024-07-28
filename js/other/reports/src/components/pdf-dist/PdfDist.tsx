import React, { useState, useEffect, useRef } from "react";
import { getDocument } from "pdfjs-dist/es5/build/pdf";
import pdfjsWorker from "pdfjs-dist/es5/build/pdf.worker.entry";

// Настройка пути к рабочему скрипту
if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
} else {
  const workerBlob = new Blob(['importScripts("' + pdfjsWorker + '");'], {
    type: "application/javascript",
  });
  pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
}

function PdfViewer() {
  const [file, setFile] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = function () {
        const typedarray = new Uint8Array(this.result);

        getDocument(typedarray).promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = canvasRef.current;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: canvas.getContext("2d"),
              viewport: viewport,
            };
            page.render(renderContext);
          });
        });
      };

      fileReader.readAsArrayBuffer(file);
    }
  }, [file]);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default PdfViewer;
