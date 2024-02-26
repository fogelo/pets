import { app } from "./app";
export const port = 3004;

// запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
