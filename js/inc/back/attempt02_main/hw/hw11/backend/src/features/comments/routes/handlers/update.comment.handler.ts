import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { commentsService } from "../../application/comment.service";
import { CommentCreateInput } from "../input/comment-create.input";

export const updateCommentHandler = async (
  req: express.Request<{ id: string }, {}, CommentCreateInput>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const user = req.user;
    const comment = await commentsService.findByIdOrFail(id);
    // const commentOutput = await mapToCommentOutput(comment);

    // запрещаем обновлять не свои комментарии
    // if (user?.id !== commentOutput.commentatorInfo.userId) {
    //   res.sendStatus(HttpStatus.Forbidden);
    //   return;
    // }

    if (user?.id !== comment.userId) {
      res.sendStatus(HttpStatus.Forbidden);
      return;
    }

    await commentsService.update(id, body);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
