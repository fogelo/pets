import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { commentsService } from "../../application/comment.service";
import { mapToCommentOutput } from "../mappers/map-to-comment-output";

export const getCommentHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const comment = await commentsService.findByIdOrFail(id);
    const commentOutput = await mapToCommentOutput(comment);
    res.status(HttpStatus.Ok).send(commentOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
