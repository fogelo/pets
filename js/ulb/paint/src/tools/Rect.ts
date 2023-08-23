import Tool from "./Tool";

export default class Rect extends Tool {
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
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL(); // сохранили картинку
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }
  mouseUpHandler() {
    this.mouseDown = false;
  }
  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // очистил все
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // нарисовал заоново то, что было
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h); // нарисовал новую фигур
      this.ctx.fill();
      this.ctx.stroke()
    };
    console.log("draw rect");
  }
}
