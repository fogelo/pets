import express, { Express } from "express";
import { IDb } from "../db/db";
import { HTTP_STATUSES } from "../utils";

export const getTestsRouter = (db: IDb) => {
  const router = express.Router();

  // для тестов
  router.delete("/data", (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
