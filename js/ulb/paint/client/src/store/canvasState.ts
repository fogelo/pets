// состояние о канвасе и вспомогательных элементах

import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  constructor() {
    makeAutoObservable(this);
  }
  setCanvas(canvas) {
    this.canvas = canvas;
  }
  pushToUndo(data) {
    this.undoList.push(data);
  }
  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    const ctx = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  redo() {
    const ctx = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } 
  }
}

/* 
  хранить канвас в глобальном сторе необходимо для того, чтобы получить доступ к нему из других компонент
*/

export default new CanvasState();
