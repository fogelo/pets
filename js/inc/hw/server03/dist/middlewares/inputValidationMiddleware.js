"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../types");
const inputValidationMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        return next();
    }
    const errorsMessages = result
        .array({ onlyFirstError: true })
        .map((error) => ({
        message: error.msg,
        field: error.type === "field" ? error.path : "unknown",
    }));
    const error = {
        errorsMessages,
    };
    res.status(types_1.Status.BadRequest_400).json(error);
};
exports.inputValidationMiddleware = inputValidationMiddleware;
