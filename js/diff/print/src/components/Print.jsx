import React, { useEffect, useState } from "react";

const Print = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrintClick = () => {
    setIsPrinting(true);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia("print");

    const handlePrint = (event) => {
      setIsPrinting(event.matches);
    };

    mediaQueryList.addEventListener("change", handlePrint);

    return () => {
      mediaQueryList.removeEventListener("change", handlePrint);
    };
  }, []);

  useEffect(() => {
    if (isPrinting) {
      window.print();
    }
  }, [isPrinting]);

  return (
    <div>
      {isPrinting ? (
        <p>Подготовка к печати...</p>
      ) : (
        <div>
          <p>Этот контент будет напечатан.</p>
          <button onClick={handlePrintClick}>Печать</button>
        </div>
      )}
      <div className="header"></div>
      <div className="footer"></div>
    </div>
  );
};

export default Print;
