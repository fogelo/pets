import express from "express";
import { BlogQueryInput } from "../input/blog-query.input";
import { blogsService } from "../../application/blogs.service";

export const getBlogListHandler = async (
  req: express.Request<{}, {}, {}, BlogQueryInput>,
  res: express.Response
) => {
  const queryInput = req.query;
  const blogs = await blogsService.findMany(queryInput);
  res.status(201).json(blogs);
};
