const { contextBridge, ipcRenderer } = require("electron");

// contextBridge - это буквально мост между двумя изолированными контекстами:
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  hello: () => "Hello from preload.js",
  ping: () => ipcRenderer.invoke("ping"),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("hello", "Hello from preload.js");
