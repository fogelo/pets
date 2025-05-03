import express, { Router } from "express";
import { db } from "../db/db";
import { HTTP_STATUSES } from "../http_statuses";

export const testsRouter: Router = express.Router();

testsRouter.delete("/data", (req, res) => {
  db.clear();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
