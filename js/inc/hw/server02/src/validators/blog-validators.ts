import { body } from "express-validator";

export const maxNameLength = 15;
const nameValidation = body("name")
  .isString()
  .withMessage("name must be a string")
  // .trim()
  .isLength({ max: maxNameLength })
  .withMessage(`name must be no more than ${maxNameLength} chars`);

export const maxDescLength = 500;
const descriptionValidation = body("description")
  .isString()
  .withMessage("description must be a string")
  // .trim()
  .isLength({ max: maxDescLength })
  .withMessage(`description must be no more than ${maxDescLength} chars`);

export const maxWebsiteUrlLength = 100;
const websiteUrlValidation = body("websiteUrl")
  .isString()
  .withMessage("websiteUrl must be a string")
  // .trim()
  .isLength({ max: maxWebsiteUrlLength })
  .withMessage(`websiteUrl must be no more than ${maxWebsiteUrlLength} chars`)
  .matches("^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$")
  .withMessage("websiteUrl does not match the pattern");

export const blogValidation = () => [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];
