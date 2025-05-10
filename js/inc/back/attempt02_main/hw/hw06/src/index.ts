import { SETTINGS } from "./core/settings/settings";
import { runDB } from "./db/db";
import { setApp } from "./set-app";
import express from "express";

const bootstrap = () => {
  const app: express.Express = express();

  setApp(app);
  runDB(SETTINGS.MONGO_URL);

  app.listen(SETTINGS.PORT, () => {
    console.log(`✅ Сервер запущен на порту ${SETTINGS.PORT}`);
  });
};

bootstrap();
