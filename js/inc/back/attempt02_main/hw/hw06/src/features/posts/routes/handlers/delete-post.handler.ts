import express from "express";
import { postsService } from "../../application/posts.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const deletePostHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    await postsService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
