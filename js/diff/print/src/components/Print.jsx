import React, { useEffect, useState } from "react";

const Print = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("print");

    const handlePrint = (event) => {
      setIsPrinting(event.matches);
    };

    // Используем addEventListener вместо addListener
    mediaQueryList.addEventListener("change", handlePrint);

    return () => {
      // Используем removeEventListener вместо removeListener
      mediaQueryList.removeEventListener("change", handlePrint);
    };
  }, []);

  const [isReadyForPrint, setIsReadyForPrint] = useState(false);

  useEffect(() => {
    if (isPrinting) {
      // Логика для определения, что рендеринг завершён
      // ...
      //   setIsReadyForPrint(true);
      window.print();
    }
  }, [isPrinting]);

  const handlePrintClick = () => {
    setIsPrinting(true);
  };

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
