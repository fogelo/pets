import express, { Express } from "express";
import { HTTP_STATUSES } from "../utils";
import { IDb } from "../db_repositories(dal)/courses_repository";

export const getTestsRouter = (db: IDb) => {
  const router = express.Router();

  // для тестов
  router.delete("/data", (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
