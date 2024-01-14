import { body } from "express-validator";
import { BlogRepository } from "../repositories/blog-repository";

export const maxTitleLength = 30;
const titleValidator = body("title")
  .isString()
  .withMessage("title should be a string")
  // .trim()
  .isLength({ max: maxTitleLength })
  .withMessage(`title max length is ${maxTitleLength} chars`);

export const maxShortDescriptionLength = 100;
const shortDescriptionValidator = body("shortDescription")
  .isString()
  .withMessage("shortDescription should be a string")
  // .trim()
  .isLength({ max: maxShortDescriptionLength })
  .withMessage(
    `shortDescription max length is ${maxShortDescriptionLength} chars`
  );

export const maxContentLength = 1000;
const contentValidator = body("content")
  .isString()
  .withMessage("content should be a string")
  // .trim()
  .isLength({ max: maxContentLength })
  .withMessage(`content max length is ${maxContentLength} chars`);

const blogIdValidator = body("blogId").custom((blogId) => {
  const existingBlog = BlogRepository.getBlogById(blogId);
  if (!existingBlog) {
    throw new Error("icorrect blogId");
  }
  return true;
});

export const postValidation = () => [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
];
