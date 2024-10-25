import { useState, useRef, useEffect } from "react";

const EditableDocument = () => {
  const textRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleMouseUp = () => {
    if (isSelecting) {
      console.log(window.getSelection());
      setIsSelecting(false);
    }
  };

  const handleMouseDown = () => {
    setIsSelecting(true);
  };

  const renderText = () => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  };

  useEffect(() => {

    
    console.log(textRef.current.innerText);
  }, []);

  return (
    <div>
      <p ref={textRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        {/* {renderText()} */}
        Lorem, <span style={{ color: "red" }}>ipsum</span> dolor sit amet
        consectetur adipisicing.
      </p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
  );
};

export default EditableDocument;
