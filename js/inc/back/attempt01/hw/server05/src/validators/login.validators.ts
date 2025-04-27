import { body } from "express-validator";

const loginOrEmailValidator = body("loginOrEmail")
  .isString()
  .withMessage("loginOrEmail must be a string")
  .trim()
  .notEmpty()
  .withMessage("loginOrEmail is an empty string");

const passwordValidator = body("password")
  .isString()
  .withMessage("password must be a string")
  .trim()
  .notEmpty()
  .withMessage("password is an empty string");

export const loginValidation = () => [loginOrEmailValidator, passwordValidator];
