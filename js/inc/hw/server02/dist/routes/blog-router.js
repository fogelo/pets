"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const db_1 = require("../db/db");
const blog_validators_1 = require("../validators/blog-validators");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const types_1 = require("../types");
const blog_repository_1 = require("../repositories/blog-repository");
exports.blogRouter = (0, express_1.Router)({});
exports.blogRouter.get("/", (req, res) => {
    res.send(db_1.db.blogs);
});
exports.blogRouter.get("/:id", (req, res) => {
    const blog = db_1.db.blogs.find((blog) => blog.id === req.params.id);
    if (blog) {
        res.status(types_1.Status.Ok_200).json(blog);
    }
    else {
        res.sendStatus(types_1.Status.NotFound_404);
    }
});
exports.blogRouter.post("/", auth_middleware_1.authMiddleware, (0, blog_validators_1.blogValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const newBlog = {
        id: new Date().getTime().toString(),
        name,
        description,
        websiteUrl,
    };
    blog_repository_1.BlogRepository.createBlog(newBlog);
    res.status(types_1.Status.Created_201).json(newBlog);
});
exports.blogRouter.put("/:id", auth_middleware_1.authMiddleware, (0, blog_validators_1.blogValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    let existingBlog = db_1.db.blogs.find((blog) => blog.id === req.params.id);
    if (!existingBlog) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const { name, description, websiteUrl } = req.body;
    blog_repository_1.BlogRepository.updateBlog({
        id: req.params.id,
        name,
        description,
        websiteUrl,
    });
    res.sendStatus(types_1.Status.NoContent_204);
});
exports.blogRouter.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    const existingBlog = blog_repository_1.BlogRepository.getBlogById(req.params.id);
    if (!existingBlog) {
        res.sendStatus(types_1.Status.NotFound_404);
    }
    res.sendStatus(types_1.Status.NoContent_204);
});
