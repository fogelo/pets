import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      >
        brush
      </button>
      <button
        className="toolbar__btn rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      >
        rect
      </button>
      <button className="toolbar__btn circle">circle</button>
      <button className="toolbar__btn eraser">eraser</button>
      <button className="toolbar__btn line">line</button>
     
      <button className="toolbar__btn undo">undo</button>
      <button className="toolbar__btn redo">redo</button>
      <button className="toolbar__btn save">save</button>
    </div>
  );
};

export default Toolbar;
