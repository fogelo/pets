import { app } from "./app";
import { runDb } from "./db_repositories(dal)/db";
export const port = 3004;

// запускаем сервер

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
  });
};

startApp();
