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
const passwordValidator = body("password")
  .isString()
  .withMessage("password must be a string")
  .trim()
  .notEmpty()
  .withMessage("password is an empty string")
  .isLength({ min: minLoginLength, max: maxLoginLength })
  .withMessage(
    `password must be min: ${minLoginLength} and max: ${maxLoginLength} chars`
  );

const emailValidator = body("email")
  .isString()
  .withMessage("email must be a string")
  .trim()
  .notEmpty()
  .withMessage(
    `email must be min: ${minLoginLength} and max: ${maxLoginLength} chars`
  )
  .matches("^[w-.]+@([w-]+.)+[w-]{2,4}$")
  .withMessage(
    "email does not match the pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$'. Example: example@example.com"
  );

export const loginValidation = () => [
  loginValidator,
  passwordValidator,
  emailValidator,
];
