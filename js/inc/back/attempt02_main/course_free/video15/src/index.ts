import { app } from "./settings";

const port = 3001;

app.listen(port, () => {
  console.log(`Сервер запущен на порту: ${port}`);
});
