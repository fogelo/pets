"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = exports.maxContentLength = exports.maxShortDescriptionLength = exports.maxTitleLength = void 0;
const express_validator_1 = require("express-validator");
exports.maxTitleLength = 30;
const titleValidation = (0, express_validator_1.body)("title")
    .isString()
    .withMessage("title should be a string")
    .trim()
    .isLength({ max: exports.maxTitleLength })
    .withMessage(`title max length is ${exports.maxTitleLength} chars`);
exports.maxShortDescriptionLength = 100;
const shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .isString()
    .withMessage("shortDescription should be a string")
    .trim()
    .isLength({ max: exports.maxShortDescriptionLength })
    .withMessage(`shortDescription max length is ${exports.maxShortDescriptionLength} chars`);
exports.maxContentLength = 1000;
const contentValidation = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content should be a string")
    .trim()
    .isLength({ max: exports.maxContentLength })
    .withMessage(`content max length is ${exports.maxContentLength} chars`);
const blogIdValidation = (0, express_validator_1.body)("blogId")
    .isString()
    .withMessage("blogId should be a string");
const postValidation = () => [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
];
exports.postValidation = postValidation;
