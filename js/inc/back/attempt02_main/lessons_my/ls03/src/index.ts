import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./core/settings/settings";
import { runDB } from "./db/mongo.db";

const bootstrap = async () => {
  // создание экземпляра приложения
  const app = express();
  setupApp(app);

  // порт приложения
  const PORT = SETTINGS.PORT;

  // подключение к БД
  await runDB(SETTINGS.MONGO_URL);

  // запуск приложения
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
  return app;
};

bootstrap();
