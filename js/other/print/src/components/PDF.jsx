import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import svg from "../assets/cat_hungry.png";
const Print = () => {
  const contentRef = useRef();

  const generatePDF = async () => {
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const marginTop = 50;
    const marginBottom = 50;

    pdf.text("Заголовок", 15, marginTop);
    pdf.addImage(
      imgData,
      "PNG",
      0,
      marginTop + 20,
      canvas.width,
      canvas.height
    );

    const footerImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAADpihlKAAAAMFBMVEXd3d3////f39/w8PD09PTz8/Pv7+/x8fHo6Ojm5ubk5OTn5+fs7Ozt7e3q6urg4ODh4eGIlE4JAAAFnUlEQVR4nO2da3OiOhCGIbCg4CKKiooK6i7q//8Pa5taa2vTzO5MSTJxkk12mXfPnOeQSSaTSTIqlUqlUqk0mUymUqlUKpVKpVKplEqlUqlUKpVKpVJpPB4PFotFItFoNB6PxWKxWCwWi0VisVgsFovFYrFYLBaLxFgMBuPxer1er9fr9Xo8Ho/H4/F4PB6Px+Fw+Hw+H49HIeFwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByG4/E4HA6Hw+FwOBwOh8PhcDgchuPxOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4Xw9H+DiFtLra7";
    const imageWidth = 30;
    const imageHeight = 30;
    pdf.addImage(
      footerImage,
      "PNG",
      15,
      canvas.height - marginBottom - imageHeight,
      imageWidth,
      imageHeight
    );
    pdf.text(
      "Текст рядом с изображением",
      15 + imageWidth + 10,
      canvas.height - marginBottom
    );

    pdf.save("document.pdf");
  };

  return (
    <div>
      <div ref={contentRef} style={{ width: "210mm", minHeight: "297mm" }}>
        {/* Ваш контент для PDF */}
        <p>Это ваш контент, который будет в PDF.</p>
      </div>
      <button onClick={generatePDF}>Создать PDF</button>
    </div>
  );
};

export default Print;
