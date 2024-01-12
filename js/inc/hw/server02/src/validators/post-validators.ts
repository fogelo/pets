import { body } from "express-validator";

const maxTitleLength = 30;
const titleValidation = body("title")
  .isString()
  .withMessage("title should be a string")
  .isLength({ max: maxTitleLength })
  .withMessage(`title max length is ${maxTitleLength} chars`);

const maxShortDescriptionLength = 100;
const shortDescriptionValidation = body("shortDescription")
  .isString()
  .withMessage("shortDescription should be a string")
  .isLength({ max: maxShortDescriptionLength })
  .withMessage(
    `shortDescription max length is ${maxShortDescriptionLength} chars`
  );

const maxContentLength = 1000;
const contentValidation = body("content")
  .isString()
  .withMessage("content should be a string")
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
