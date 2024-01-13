"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = exports.maxWebsiteUrlLength = exports.maxDescLength = exports.maxNameLength = void 0;
const express_validator_1 = require("express-validator");
exports.maxNameLength = 15;
const nameValidation = (0, express_validator_1.body)("name")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .isLength({ max: exports.maxNameLength })
    .withMessage(`name must be no more than ${exports.maxNameLength} chars`);
exports.maxDescLength = 500;
const descriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .isLength({ max: exports.maxDescLength })
    .withMessage(`description must be no more than ${exports.maxDescLength} chars`);
exports.maxWebsiteUrlLength = 100;
const websiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isString()
    .withMessage("websiteUrl must be a string")
    .trim()
    .isLength({ max: exports.maxWebsiteUrlLength })
    .withMessage(`websiteUrl must be no more than ${exports.maxWebsiteUrlLength} chars`)
    .matches("^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$")
    .withMessage("websiteUrl does not match the pattern");
const blogValidation = () => [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
];
exports.blogValidation = blogValidation;
