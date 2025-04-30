import express, { Express, Request, Response } from "express";
import { driversRouter } from "./drivers/routers/drivers.router";
import { testingRouter } from "./testing/routers/testing.router";
import { setupSwagger } from "./core/swagger/setup-swagger";
import { DRIVERS_PATH, TESTING_PATH } from "./core/paths/paths";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса (без express.json() в req.body будет undefined)

  // основной роут
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world!");
  });

  app.use(DRIVERS_PATH, driversRouter);
  app.use(TESTING_PATH, testingRouter);

  setupSwagger(app);
  return app;
};
