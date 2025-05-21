import { body } from "express-validator";

export const minLoginLength = 3;
export const maxLoginLength = 10;
const loginValidator = body("login")
  .isString()
  .withMessage("login must be a string")
  .trim()
  .notEmpty()
  .withMessage("login is an empty string")
  .isLength({ min: minLoginLength, max: maxLoginLength })
  .withMessage(
    `login must be min: ${minLoginLength} and max: ${maxLoginLength} chars`
  )
  .matches("^[a-zA-Z0-9_-]*$")
  .withMessage("login does not match the pattern");

export const minPasswordLength = 6;
export const maxPasswordLength = 20;
export const passwordValidator = body("password")
  .isString()
  .withMessage("password must be a string")
  .trim()
  .notEmpty()
  .withMessage("password is an empty string")
  .isLength({ min: minPasswordLength, max: maxPasswordLength })
  .withMessage(
    `password must be min: ${minLoginLength} and max: ${maxLoginLength} chars`
  );

export const emailValidator = body("email")
  .exists({ checkFalsy: true })
  .withMessage("email is required")
  .isString()
  .withMessage("email must be a string")
  .trim()
  .notEmpty()
  .withMessage(
    `email must be min: ${minLoginLength} and max: ${maxLoginLength} chars`
  )
  .matches(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)
  .withMessage(
    "email does not match the pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$'. Example: example@example.com"
  );

export const loginOrEmailValidator = body("loginOrEmail")
  .isString()
  .withMessage("loginOrEmail must be a string")
  .trim()
  .notEmpty()
  .withMessage("loginOrEmail is an empty string");

export const codeConfirmationValidator = body("code")
  .exists({ checkFalsy: true })
  .withMessage("code is required")
  .isString()
  .withMessage("code must be a string")
  .trim()
  .notEmpty()
  .withMessage("code is an empty string");

export const recoveryCodeValidator = body("recoveryCode")
  .exists({ checkFalsy: true })
  .withMessage("recoveryCode is required")
  .isString()
  .withMessage("recoveryCode must be a string")
  .trim()
  .notEmpty()
  .withMessage("recoveryCode is an empty string");

export const newPasswordValidator = body("newPassword")
  .isString()
  .withMessage("password must be a string")
  .trim()
  .notEmpty()
  .withMessage("password is an empty string")
  .isLength({ min: minPasswordLength, max: maxPasswordLength })
  .withMessage(
    `password must be min: ${minLoginLength} and max: ${maxLoginLength} chars`
  );

export const registrationValidation = () => [
  loginValidator,
  passwordValidator,
  emailValidator,
];
