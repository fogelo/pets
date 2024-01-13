import { Router, Response } from "express";
import { db } from "../db/db";
import { Status } from "../types";
import { authMiddleware } from "../middlewares/auth-middleware";

export const testRouter = Router();

testRouter.delete("/all-data", (_, res: Response) => {
  db.blogs = [];
  db.posts = [];
  res.sendStatus(Status.NoContent_204);
});
