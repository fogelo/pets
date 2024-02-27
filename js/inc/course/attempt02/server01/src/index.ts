import express from "express";
import { productsRouter } from "./routes/productsRouter";
import { adressesRouter } from "./routes/adressesRouter";

export const app = express();
const port = 3001;

// middlewares
app.use(express.json());

// routers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRouter);
app.use("/adresses", adressesRouter);

// start
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
