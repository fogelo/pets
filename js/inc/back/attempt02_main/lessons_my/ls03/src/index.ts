import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./core/settings/settings";
import { runDB } from "./db/mongo.db";

const bootstrap = async () => {
  const app = express(); // создание экземпляра приложения
  setupApp(app); // настройка роутов

  const PORT = SETTINGS.PORT;

  await runDB(SETTINGS.MONGO_URL); // подключение к БД

  // запуск приложения
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
  });
  return app;
};

bootstrap();
