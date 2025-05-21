import { Router } from "express";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";
import { getCommentHandler } from "./handlers/get.comment.handler";
import { deleteCommentHandler } from "./handlers/delete.comment.handler";
import { authMiddleware } from "../../auth/auth.middleware";
import { updateCommentHandler } from "./handlers/update.comment.handler";
import { commentBodyValidation, likeStatusCommentValidator } from "../comment.input-dto.validation-middlewares";
import { updateCommentLikeHandler } from "./handlers/update.comment-like.handler";

export const commentsRouter: Router = Router({});

commentsRouter
  .get("/:id", idValidation, inputValidationResultMiddleware, getCommentHandler)
  .delete(
    "/:id",
    authMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler
  )
  .put(
    "/:id",
    authMiddleware,
    idValidation,
    commentBodyValidation(),
    inputValidationResultMiddleware,
    updateCommentHandler
  )
  .put(
    "/:id/like-status",
    authMiddleware,
    likeStatusCommentValidator,
    inputValidationResultMiddleware,
    updateCommentLikeHandler
  );
