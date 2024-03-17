"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = exports.maxContentLength = exports.maxShortDescriptionLength = exports.maxTitleLength = void 0;
const express_validator_1 = require("express-validator");
const blogRepository_1 = require("../repositories/blogRepository");
exports.maxTitleLength = 30;
const titleValidator = (0, express_validator_1.body)("title")
    .isString()
    .withMessage("title should be a string")
    .trim()
    .notEmpty()
    .withMessage("title is an empty string")
    .isLength({ max: exports.maxTitleLength })
    .withMessage(`title max length is ${exports.maxTitleLength} chars`);
exports.maxShortDescriptionLength = 100;
const shortDescriptionValidator = (0, express_validator_1.body)("shortDescription")
    .isString()
    .withMessage("shortDescription should be a string")
    .trim()
    .notEmpty()
    .withMessage("shortDescription is an empty string")
    .isLength({ max: exports.maxShortDescriptionLength })
    .withMessage(`shortDescription max length is ${exports.maxShortDescriptionLength} chars`);
exports.maxContentLength = 1000;
const contentValidator = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content should be a string")
    .trim()
    .notEmpty()
    .withMessage("shortDescription is an empty string")
    .isLength({ max: exports.maxContentLength })
    .withMessage(`content max length is ${exports.maxContentLength} chars`);
const blogIdValidator = (0, express_validator_1.body)("blogId")
    .isString()
    .withMessage("content should be a string")
    .custom((blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield blogRepository_1.BlogRepository.getBlogById(blogId);
    if (!existingBlog) {
        throw new Error("incorrect blogId");
    }
    return true;
}));
const postValidation = () => [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,
];
exports.postValidation = postValidation;
