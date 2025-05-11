import { Router } from "express";
import { createPostHandler } from "./handlers/create-post.handler";
import { deletePostHandler } from "./handlers/delete-post.handler";
import { getPostListHandler } from "./handlers/get-post-list-handler";
import { getPostHandler } from "./handlers/get-post.handler";
import { updatePostHandler } from "./handlers/update-post.handler";
import { postValidation } from "./post.input-dto.validation-middlewares";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { superAdminGuardMiddleware } from "../../../core/middlewares/super-admin.guard-middleware";
import { paginationAndSortingValidation } from "../../../core/middlewares/query-pagination-sorting.validation-middleware";
import { PostSortField } from "./input/post-sort-field";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";

export const postsRouter: Router = Router({});

postsRouter
  .get("", paginationAndSortingValidation(PostSortField), getPostListHandler)
  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)
  .post(
    "",
    superAdminGuardMiddleware,
    postValidation(),
    inputValidationResultMiddleware,
    createPostHandler
  )
  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postValidation(),
    inputValidationResultMiddleware,
    updatePostHandler
  )
  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler
  );
