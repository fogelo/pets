import { body } from "express-validator";
import { BlogQueryRepository } from "../repositories/blog.query.repository";

export const maxTitleLength = 30;
const titleValidator = body("title")
  .isString()
  .withMessage("title should be a string")
  .trim()
  .notEmpty()
  .withMessage("title is an empty string")
  .isLength({ max: maxTitleLength })
  .withMessage(`title max length is ${maxTitleLength} chars`);

export const maxShortDescriptionLength = 100;
const shortDescriptionValidator = body("shortDescription")
  .isString()
  .withMessage("shortDescription should be a string")
  .trim()
  .notEmpty()
  .withMessage("shortDescription is an empty string")
  .isLength({ max: maxShortDescriptionLength })
  .withMessage(
    `shortDescription max length is ${maxShortDescriptionLength} chars`
  );

export const maxContentLength = 1000;
const contentValidator = body("content")
  .isString()
  .withMessage("content should be a string")
  .trim()
  .notEmpty()
  .withMessage("shortDescription is an empty string")
  .isLength({ max: maxContentLength })
  .withMessage(`content max length is ${maxContentLength} chars`);

const blogIdValidator = body("blogId")
  .isString()
  .withMessage("content should be a string")
  .custom(async (blogId) => {
    const existingBlog = await BlogQueryRepository.getBlogById(blogId);
    if (!existingBlog) {
      throw new Error("incorrect blogId");
    }
    return true;
  });

export const postValidation = () => [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
];

export const createPostFromBlogValidation = () => [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
];
