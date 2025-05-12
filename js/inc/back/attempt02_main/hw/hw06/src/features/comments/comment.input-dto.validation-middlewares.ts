import { body } from "express-validator";

export const maxCommentLength = 300;
export const minCommentLength = 20;
const contentValidator = body("content")
  .exists({ checkFalsy: true })
  .withMessage("content is required")
  .isString()
  .withMessage("title should be a string")
  .trim()
  .notEmpty()
  .withMessage("content is an empty string")
  .isLength({ min: minCommentLength, max: maxCommentLength })
  .withMessage(
    `content length should be min>=${minCommentLength} and max<=300 ${maxCommentLength} chars`
  );

export const commentBodyValidation = () => [contentValidator];


