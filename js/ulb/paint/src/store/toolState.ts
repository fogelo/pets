// состояние и логика обработки состояния, связанные с инструментами

import { makeAutoObservable } from "mobx";

/* 
Чтобы пользоваться состоянием нужно создать класс, в конструкторе которого вызвать функцию makeAutoObservable. 
Она сделает данные, которые хранятся в этом классе отслеживаемыми. И каждый раз когда эти данные изменяются реакт перерендеривает компонент.

*/
class ToolState {
  tool = null;
  constructor() {
    makeAutoObservable(this);
  }
  //такие функции называются action(те функции, кторые как-то изменяют состояние)
  setTool(tool: any) {
    this.tool = tool;
  }
  setFillColor(color) {
    this.tool.fillColor = color;
  }
  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }
  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

// и по итогу нужно экспортировать объект данного класса

export default new ToolState();
