import express, { Router } from "express";
import { dbInMemory } from "../db/db-in-memory";
import { HTTP_STATUSES } from "../http_statuses";

export const testsRouter: Router = express.Router();

testsRouter.delete("/data", (req, res) => {
  dbInMemory.clear();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
