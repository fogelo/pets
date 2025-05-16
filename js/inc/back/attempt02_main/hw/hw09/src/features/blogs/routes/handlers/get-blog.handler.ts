import express from "express";
import { blogsService } from "../../application/blogs.service";
import { mapToBlogOutput } from "../mappers/map-to-blog-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const getBlogHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const blog = await blogsService.findByIdOrFail(id);
    const blogOutput = mapToBlogOutput(blog);
    res.status(HttpStatus.Ok).send(blogOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
