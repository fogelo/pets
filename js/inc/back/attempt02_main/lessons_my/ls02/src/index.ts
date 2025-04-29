import express from "express";
import { setupApp } from "./setup-app";

// создание экземпляра приложения
export const app = express();
setupApp(app);

// порт приложения
const PORT = process.env.PORT || 5001;

// запуск приложения
export const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
