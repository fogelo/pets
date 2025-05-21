import express from "express";
import { blogsService } from "../../application/blogs.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { BlogUpdateInput } from "../input/blog-update.input";

export const updateBlogHandler = async (
  req: express.Request<{ id: string }, {}, BlogUpdateInput>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await blogsService.update(id, body);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
