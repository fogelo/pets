import { Response, Router } from "express";
import {
  blogsCollection,
  postsCollection,
  usersCollection
} from "../db/db";
import { Status } from "../models/common";

export const testRouter = Router();

testRouter.delete("/all-data", async (_, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  await usersCollection.deleteMany({});

  //можно еще удалить данные в базе вот так, но нужны админские права
  // db.dropDatabase()

  res.sendStatus(Status.NoContent_204);
});
