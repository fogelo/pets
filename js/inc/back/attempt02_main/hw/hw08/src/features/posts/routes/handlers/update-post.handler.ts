import express from "express";
import { postsService } from "../../application/posts.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { PostUpdateInput } from "../input/post-update.input";

export const updatePostHandler = async (
  req: express.Request<{ id: string }, {}, PostUpdateInput>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await postsService.update(id, body);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
