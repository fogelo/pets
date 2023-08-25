import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas); // функция super вызывает constructor родительского класса
    this.listen();
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    // this.ctx.moveTo(
    //   e.pageX - e.target.offsetLeft,
    //   e.pageY - e.target.offsetTop
    // );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }
  mouseUpHandler() {
    this.mouseDown = false;
  }
  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    console.log("draw brush");
  }
}
