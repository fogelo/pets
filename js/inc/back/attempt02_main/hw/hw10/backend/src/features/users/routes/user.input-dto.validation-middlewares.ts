import { body } from "express-validator";

export const maxLoginLength = 10;
export const minLoginLength = 3;
const loginPattern = /^[a-zA-Z0-9_-]*$/; //чтобы исключить логин только из цифр
const loginValidator = body("login")
  .isString()
  .withMessage("login must be a string")
  .trim()
  .notEmpty()
  .withMessage("login is an empty string")
  .isLength({ max: maxLoginLength, min: minLoginLength })
  .withMessage(
    `login must be no no less than ${minLoginLength} and more than ${maxLoginLength} chars`
  )
  .matches(loginPattern)
  .withMessage("login does not match the pattern: ^[a-zA-Z0-9_-]*$");

export const maxPasswordLength = 20;
export const minPasswordLength = 6;
const passwordValidator = body("password")
  .isString()
  .withMessage("password must be a string")
  .trim()
  .notEmpty()
  .withMessage("password is an empty string")
  .isLength({ max: maxPasswordLength, min: minPasswordLength })
  .withMessage(
    `password must be no less than ${minPasswordLength} and no more than ${maxPasswordLength} chars`
  );

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailValidator = body("email")
  .isString()
  .withMessage("email must be a string")
  .trim()
  .notEmpty()
  .withMessage("email is an empty string")
  .matches(emailPattern)
  .withMessage(
    "email does not match the pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$'. Example: example@example.com"
  );

export const userValidation = () => [
  loginValidator,
  passwordValidator,
  emailValidator,
];
