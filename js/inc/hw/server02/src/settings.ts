import express from "express";
import { authMiddleware } from "./middlewares/auth-middleware";
export const app = express();

//middlewares
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
