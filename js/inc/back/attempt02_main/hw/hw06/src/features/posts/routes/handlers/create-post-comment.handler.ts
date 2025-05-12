import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { commentsService } from "../../../comments/application/comment.service";
import { mapToCommentOutput } from "../../../comments/routes/mappers/map-to-comment-output";
import { CommentCreateInput } from "../../../comments/routes/input/comment-update.input";

export const createPostCommentHandler = async (
  req: express.Request<{ id: string }, {}, CommentCreateInput>,
  res: express.Response
) => {
  try {
    const postId = req.params.id;
    const userId = req.user!.id;
    const body = req.body;
    const dto = { ...body, postId, userId };
    const createdCommentId = await commentsService.create(dto, userId);
    const createdComment = await commentsService.findByIdOrFail(
      createdCommentId
    );
    const commentOutput = await mapToCommentOutput(createdComment);
    res.status(HttpStatus.Created).json(commentOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
