export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); //контекст - это некий объек, который позволяет производить различные манипуляции на канвасе (рисовать линии, фигуры)
  }
  destroyEvent() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }
}
