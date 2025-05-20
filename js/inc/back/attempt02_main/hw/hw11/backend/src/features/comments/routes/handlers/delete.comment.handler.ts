import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { commentsService } from "../../application/comment.service";

export const deleteCommentHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const comment = await commentsService.findByIdOrFail(id);
    // const commentOutput = await mapToCommentOutput(comment);

    // запрещаем удалять не свои комментарии
    // if (user?.id !== commentOutput.commentatorInfo.userId) {
    //   res.sendStatus(HttpStatus.Forbidden);
    //   return;
    // }

    if (user?.id !== comment.userId) {
      res.sendStatus(HttpStatus.Forbidden);
      return;
    }

    await commentsService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
