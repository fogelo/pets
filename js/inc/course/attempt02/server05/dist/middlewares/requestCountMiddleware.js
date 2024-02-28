"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCountMiddleware = void 0;
let count = 0;
const requestCountMiddleware = (req, res, next) => {
    count++;
    console.log(count);
    next();
};
exports.requestCountMiddleware = requestCountMiddleware;
