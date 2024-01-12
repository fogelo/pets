import { Router, Response } from "express";
import { db } from "../db/db";
import { Status } from "../types";
import { authMiddleware } from "../middlewares/auth-middleware";

export const testRouter = Router();

testRouter.delete("/all-data", authMiddleware, (_, res: Response) => {
  db.blogs = [];
  res.sendStatus(Status.NoContent_204);
});
