import { body } from "express-validator";

export const titleValidationMiddleware = body("title")
  .isLength({ min: 2, max: 15 })
  .withMessage("длина title должне быть не меньше и 2 не больше 15 символов");
