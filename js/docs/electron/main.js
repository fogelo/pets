import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

/* 
импортируем модули app и BrowserWindow из пакета electron
app - это модуль, который управляет жизненным циклом приложения
BrowserWindow - это модуль, который управляет окнами приложения
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// создаем функцию createWindow, которая создает новое окно браузера
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  const contents = win.webContents;
  console.log(contents);
  /* 
  //   вот так можно любой сайт упаковать в electron
  win.loadURL("https://github.com"); 
  */
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
});
