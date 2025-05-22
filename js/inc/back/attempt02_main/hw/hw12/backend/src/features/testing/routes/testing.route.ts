import { Router, Request, Response } from "express";
import {
  blogsCollection,
  commentLikesCollection,
  commentsCollection,
  devicesCollection,
  postLikesCollection,
  postsCollection,
  usersCollection,
} from "../../../db/db";
import { HttpStatus } from "../../../core/types/http-statuses";

export const testingRouter: Router = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  //truncate db
  await Promise.all([
    usersCollection.deleteMany(),
    blogsCollection.deleteMany(),
    postsCollection.deleteMany(),
    commentsCollection.deleteMany(),
    devicesCollection.deleteMany(),
    postLikesCollection.deleteMany(),
    commentLikesCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatus.NoContent);
  return;
});
