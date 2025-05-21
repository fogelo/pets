import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { commentsService } from "../../../comments/application/comment.service";
import { mapToCommentOutput } from "../../../comments/routes/mappers/map-to-comment-output";
import { CommentUpdateInput } from "../../../comments/routes/input/comment-update.input";
import { postsService } from "../../application/posts.service";

export const createPostCommentHandler = async (
  req: express.Request<{ id: string }, {}, CommentUpdateInput>,
  res: express.Response
) => {
  try {
    const postId = req.params.id;

    //проверит есть ли пост
    const post = await postsService.findById(postId);
    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
    }

    const userId = req.user!.id;
    const body = req.body;
    const dto = { ...body, postId, userId };
    const createdCommentId = await commentsService.create(dto);
    const createdComment = await commentsService.findByIdOrFail(
      createdCommentId
    );
    const commentOutput = await mapToCommentOutput(createdComment, userId);
    res.status(HttpStatus.Created).json(commentOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
