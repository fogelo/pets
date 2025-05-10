import { Router } from "express";
import { createUserHandler } from "./handlers/create-user.handler";
import { deleteUserHandler } from "./handlers/delete-user.handler";
import { getUserListHandler } from "./handlers/get-user-list.handler";
import { userValidation } from "./user.input-dto.validation-middlewares";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { paginationAndSortingValidation } from "../../../core/middlewares/query-pagination-sorting.validation-middleware";
import { UserSortField } from "./input/user-sort-field";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";
import { superAdminGuardMiddleware } from "../../../core/middlewares/super-admin.guard-middleware";

export const usersRouter: Router = Router({});

usersRouter
  .get(
    "",
    paginationAndSortingValidation(UserSortField),
    inputValidationResultMiddleware,
    getUserListHandler
  )
  .post(
    "",
    superAdminGuardMiddleware,
    userValidation(),
    inputValidationResultMiddleware,
    createUserHandler
  )
  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteUserHandler
  );
