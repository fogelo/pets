import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { commentsService } from "../../application/comment.service";
import { CommentUpdateInput } from "../input/comment-create.input";

export const updateCommentHandler = async (
  req: express.Request<{ id: string }, {}, CommentUpdateInput>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await commentsService.update(id, body);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
