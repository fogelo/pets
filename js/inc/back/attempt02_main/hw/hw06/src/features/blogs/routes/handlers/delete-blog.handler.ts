import express from "express";
import { blogsService } from "../../application/blogs.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const deleteBlogHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    await blogsService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
