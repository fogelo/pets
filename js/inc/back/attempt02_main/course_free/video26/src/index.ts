import { DbManager } from "./db/db";
import { app } from "./settings";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const startApp = async () => {
  await DbManager.startDb();
  app.listen(port, () => {
    if (!port) {
      throw new Error("PORT not defined");
    }
    console.log(`✅ Сервер запущен на порту: ${port}`);
  });
};

startApp();
