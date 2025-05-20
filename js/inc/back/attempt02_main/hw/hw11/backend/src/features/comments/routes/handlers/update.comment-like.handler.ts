import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { commentLikesService } from "../../application/comment-like.service";
import { commentsService } from "../../application/comment.service";
import { CommentLikeUpdateInput } from "../input/comment-like.update.input";
import { mapToCommentOutput } from "../mappers/map-to-comment-output";

export const updateCommentLikeHandler = async (
  req: express.Request<{ id: string }, {}, CommentLikeUpdateInput>,
  res: express.Response
) => {
  try {
    const commentId = req.params.id;
    const likeStatus = req.body.likeStatus;
    const user = req.user;
    const comment = await commentsService.findByIdOrFail(commentId);

    if (!comment) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const commentOutput = await mapToCommentOutput(comment, user?.id);
    const commentLike = await commentLikesService.findByCommentIdAndUserId(
      commentOutput.id,
      user?.id!
    );

    if (commentLike) {
      await commentLikesService.update(commentOutput.id, user?.id!, {
        likeStatus,
      });
      res.sendStatus(HttpStatus.NoContent);
      return;
    } else {
      await commentLikesService.create({
        commentId: commentOutput.id,
        userId: user?.id!,
        likeStatus,
      });
      res.sendStatus(HttpStatus.NoContent);
      return;
    }
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
