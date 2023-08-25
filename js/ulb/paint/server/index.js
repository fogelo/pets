const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.ws("/", (ws, req) => {
  console.log("подключение установелнео");
});
