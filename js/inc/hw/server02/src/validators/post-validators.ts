import { body } from "express-validator";

export const maxTitleLength = 30;
const titleValidation = body("title")
  .isString()
  .withMessage("title should be a string")
  // .trim()
  .isLength({ max: maxTitleLength })
  .withMessage(`title max length is ${maxTitleLength} chars`);

export const maxShortDescriptionLength = 100;
const shortDescriptionValidation = body("shortDescription")
  .isString()
  .withMessage("shortDescription should be a string")
  // .trim()
  .isLength({ max: maxShortDescriptionLength })
  .withMessage(
    `shortDescription max length is ${maxShortDescriptionLength} chars`
  );

export const maxContentLength = 1000;
const contentValidation = body("content")
  .isString()
  .withMessage("content should be a string")
  // .trim()
  .isLength({ max: maxContentLength })
  .withMessage(`content max length is ${maxContentLength} chars`);

const blogIdValidation = body("blogId")
  .isString()
  .withMessage("blogId should be a string");

export const postValidation = () => [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];
