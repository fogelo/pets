import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { commentsService } from "../../application/comment.service";
import { mapToCommentOutput } from "../mappers/map-to-comment-output";
import { jwtService } from "../../../auth/application/jwt.service";

export const getCommentHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    // 1) Попытка достать accessToken
    const authHeader = req.headers.authorization;
    let accessToken = authHeader?.split(" ")[1] || null;
    const comment = await commentsService.findByIdOrFail(id);

    if (!accessToken) {
      const commentOutput = await mapToCommentOutput(comment);
      res.status(HttpStatus.Ok).send(commentOutput);
      return;
    } else {
      const userId = await jwtService.getUserIdByAccessToken(accessToken);
      if (userId) {
        const commentOutput = await mapToCommentOutput(
          comment,
          userId.toString()
        );
        res.status(HttpStatus.Ok).send(commentOutput);
        return;
      } else {
        const commentOutput = await mapToCommentOutput(comment);
        res.status(HttpStatus.Ok).send(commentOutput);
        return;
      }
    }
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
