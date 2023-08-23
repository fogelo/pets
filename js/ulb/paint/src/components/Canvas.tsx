import { observer } from "mobx-react-lite";
import "../styles/canvas.scss";
import { useEffect, useRef } from "react";
import canvasState from "../store/canvasState";

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
});

export default Canvas;
