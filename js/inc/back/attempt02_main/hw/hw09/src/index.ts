import { app } from "./app";
import { SETTINGS } from "./core/settings/settings";
import { DbManager } from "./db/db";

export const bootstrap = () => {
  DbManager.startDb();
  // runDB(SETTINGS.MONGO_URL);
  app.listen(SETTINGS.PORT, () => {
    console.log(`✅ Сервер запущен на порту ${SETTINGS.PORT}`);
  });
};
bootstrap();
