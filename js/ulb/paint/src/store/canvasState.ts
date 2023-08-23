// состояние о канвасе и вспомогательных элементах

import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas = null
    constructor(){
        makeAutoObservable(this)
    }
    setCanvas(canvas){
        this.canvas = canvas
    }
}

/* 
  хранить канвас в глобальном сторе необходимо для того, чтобы получить доступ к нему из других компонент
*/


export default new CanvasState()