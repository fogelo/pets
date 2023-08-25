export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); //контекст - это некий объек, который позволяет производить различные манипуляции
    //на канвасе (рисовать линии, фигуры)
  }
  set fillColor(color) {
    this.ctx.fillStyle = color;
  }
  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }
  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }
  destroyEvent() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }
}
