import { Router, Response } from "express";
import { blogsCollection, db, postsCollection } from "../db/db";
import { Status } from "../types";

export const testRouter = Router();

testRouter.delete("/all-data", async (_, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});

  //можно еще удалить данные в базе вот так, но нужны админские права
  // db.dropDatabase()

  res.sendStatus(Status.NoContent_204);
});
