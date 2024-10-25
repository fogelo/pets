// Импортируем dotenv для загрузки переменных окружения
require('dotenv').config();
import { app } from "./settings";

const port = process.env.SERVER_PORT || 3001;
const ip = process.env.SERVER_IP || '127.0.0.1'

app.listen(port, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
