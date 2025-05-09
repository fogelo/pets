import express from "express";
import { PostQueryInput } from "../input/post-query.input";
import { postsService } from "../../application/posts.service";

export const getPostListHandler = async (
  req: express.Request<{}, {}, {}, PostQueryInput>,
  res: express.Response
) => {
  const queryInput = req.query;
  const posts = await postsService.findMany(queryInput);
  res.status(200).json(posts);
};
