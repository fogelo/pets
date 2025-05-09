import { Request, Response, Router } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { db } from "../../db/in-memory.db";
import { createDriverHandler } from "./handlers/create-driver.handler";
import { deleteDriverHandler } from "./handlers/delete-driver.handler";
import { getDriverListHandler } from "./handlers/get-driver-list.handler";
import { getDriverHandler } from "./handlers/get-driver.handler";
import { updateDriverHandler } from "./handlers/update-driver.handler";
import { idValidation } from "../../core/middlewares/validation/params-id.validation-middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validtion-result.middleware";
import { driverInputDtoValidation } from "../validation/driver.input-dto.validation-middlewares";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";

export const driversRouter: Router = Router({});

driversRouter
  .get("", getDriverListHandler)
  .get("/:id", idValidation, inputValidationResultMiddleware, getDriverHandler);
// .post(
//   "",
//   superAdminGuardMiddleware, // Проверка авторизации
//   driverInputDtoValidation, // Валидация данных
//   inputValidationResultMiddleware, // Проверка результата валидации
//   createDriverHandler // Обработчик запроса
// )
// .put(
//   "/:id",
//   superAdminGuardMiddleware, // Проверка авторизации
//   idValidation,
//   driverInputDtoValidation,
//   inputValidationResultMiddleware,
//   updateDriverHandler
// )
// .delete(
//   "/:id",
//   idValidation,
//   inputValidationResultMiddleware,
//   deleteDriverHandler
// );
