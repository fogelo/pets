import express, { Express, Request, Response } from "express";
import { driversRouter } from "./drivers/routers/drivers.router";
import { testingRouter } from "./testing/routers/testing.router";
import { setupSwagger } from "./core/swagger/setup-swagger";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса (без express.json() в req.body будет undefined)

  // основной роут
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world!");
  });

  app.use("/api/drivers", driversRouter);
  app.use("/api/testing", testingRouter);

  setupSwagger(app);
  return app;
};
