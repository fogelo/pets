import express from "express";
import { BlogCreateInput } from "../input/blog-create.input";
import { blogsService } from "../../application/blogs.service";
import { mapToBlogOutput } from "../mappers/map-to-blog-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const createBlogHandler = async (
  req: express.Request<{}, {}, BlogCreateInput>,
  res: express.Response
) => {
  try {
    const body = req.body;
    const createdBlogId = await blogsService.create(body);
    const createdBlog = await blogsService.findByIdOrFail(createdBlogId);
    const blogOutput = mapToBlogOutput(createdBlog);
    res.status(HttpStatus.Created).json(blogOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
