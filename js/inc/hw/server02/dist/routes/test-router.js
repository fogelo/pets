"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const types_1 = require("../types");
const auth_middleware_1 = require("../middlewares/auth-middleware");
exports.testRouter = (0, express_1.Router)();
exports.testRouter.delete("/all-data", auth_middleware_1.authMiddleware, (_, res) => {
    db_1.db.blogs = [];
    db_1.db.posts = [];
    res.sendStatus(types_1.Status.NoContent_204);
});
