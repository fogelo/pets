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
exports.blogRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const blogValidators_1 = require("../validators/blogValidators");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const types_1 = require("../types");
const blogRepository_1 = require("../repositories/blogRepository");
const mongodb_1 = require("mongodb");
exports.blogRouter = (0, express_1.Router)({});
exports.blogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogRepository_1.BlogRepository.getAllBlogs();
    res.send(blogs);
}));
exports.blogRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const blog = yield blogRepository_1.BlogRepository.getBlogById(id);
    if (blog) {
        res.status(types_1.Status.Ok_200).json(blog);
    }
    else {
        res.sendStatus(types_1.Status.NotFound_404);
    }
}));
exports.blogRouter.post("/", authMiddleware_1.authMiddleware, (0, blogValidators_1.blogValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl, isMembership } = req.body;
    const blogData = {
        name,
        description,
        websiteUrl,
        isMembership: isMembership !== null && isMembership !== void 0 ? isMembership : true,
        createdAt: new Date().toISOString(),
    };
    const blogId = yield blogRepository_1.BlogRepository.createBlog(blogData);
    const blog = yield blogRepository_1.BlogRepository.getBlogById(blogId);
    if (!blog) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    res.status(types_1.Status.Created_201).json(blog);
}));
exports.blogRouter.put("/:id", authMiddleware_1.authMiddleware, (0, blogValidators_1.blogValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    let existingBlog = yield blogRepository_1.BlogRepository.getBlogById(id);
    if (!existingBlog) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const { name, description, websiteUrl, isMembership } = req.body;
    const blogData = {
        name,
        description,
        websiteUrl,
        isMembership,
    };
    yield blogRepository_1.BlogRepository.updateBlog(id, blogData);
    res.sendStatus(types_1.Status.NoContent_204);
}));
exports.blogRouter.delete("/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const existingBlog = yield blogRepository_1.BlogRepository.getBlogById(id);
    if (!existingBlog) {
        res.sendStatus(types_1.Status.NotFound_404);
    }
    const isDeleted = yield blogRepository_1.BlogRepository.deleteBlog(id);
    if (!isDeleted) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    res.sendStatus(types_1.Status.NoContent_204);
}));
