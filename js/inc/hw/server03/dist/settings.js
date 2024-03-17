"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogRouter_1 = require("./routes/blogRouter");
const testRouter_1 = require("./routes/testRouter");
const postRouter_1 = require("./routes/postRouter");
exports.app = (0, express_1.default)();
// middlewares
exports.app.use(express_1.default.json());
//routers
exports.app.use("/blogs", blogRouter_1.blogRouter);
exports.app.use("/posts", postRouter_1.postRouter);
exports.app.use("/testing", testRouter_1.testRouter);
