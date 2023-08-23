import "../styles/toolbar.scss"
const Toolbar = () => {
  return (
    <div className="toolbar">
      <button className="toolbar__btn brush">
        brush
      </button>
      <button className="toolbar__btn rect">
       rect 
      </button>
      <button className="toolbar__btn circle">
        circle
      </button>
      <button className="toolbar__btn eraser">
        eraser
      </button>
      <button className="toolbar__btn line">
        line
      </button>
      <input type="color" />
      <button className="toolbar__btn undo">
        undo
      </button>
      <button className="toolbar__btn redo">
        redo
      </button>
      <button className="toolbar__btn save">
        save
      </button>
    </div>
  )
}

export default Toolbar