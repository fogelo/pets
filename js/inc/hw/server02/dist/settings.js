"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blog_router_1 = require("./routes/blog-router");
const test_router_1 = require("./routes/test-router");
const post_router_1 = require("./routes/post-router");
exports.app = (0, express_1.default)();
// middlewares
exports.app.use(express_1.default.json());
//routers
exports.app.use("/blogs", blog_router_1.blogRouter);
exports.app.use("/posts", post_router_1.postRouter);
exports.app.use("/testing", test_router_1.testRouter);
