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
exports.postRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const blogRepository_1 = require("../repositories/blogRepository");
const postRepository_1 = require("../repositories/postRepository");
const types_1 = require("../types");
const postValidators_1 = require("../validators/postValidators");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dbPosts = yield postRepository_1.PostRepository.getAllPosts();
    const dbBlogs = yield blogRepository_1.BlogRepository.getAllBlogs();
    const posts = dbPosts.map((post) => {
        const blog = dbBlogs.find((blog) => blog.id.toString() === post.blogId);
        return Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    });
    res.status(types_1.Status.Ok_200).json(posts);
}));
exports.postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const post = yield postRepository_1.PostRepository.getPostById(id);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const blog = yield blogRepository_1.BlogRepository.getBlogById(post.blogId);
    const viewPost = Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    res.status(types_1.Status.Ok_200).json(viewPost);
}));
exports.postRouter.post("/", authMiddleware_1.authMiddleware, (0, postValidators_1.postValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, shortDescription, blogId } = req.body;
    const newPost = {
        title,
        content,
        shortDescription,
        blogId,
    };
    const postId = yield postRepository_1.PostRepository.createPost(newPost);
    const post = yield postRepository_1.PostRepository.getPostById(postId);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const blog = yield blogRepository_1.BlogRepository.getBlogById(blogId);
    const newPostView = Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    res.status(types_1.Status.Created_201).json(newPostView);
}));
exports.postRouter.put("/:id", authMiddleware_1.authMiddleware, (0, postValidators_1.postValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const { title, content, shortDescription, blogId } = req.body;
    const updatedPost = {
        title,
        content,
        shortDescription,
        blogId,
    };
    yield postRepository_1.PostRepository.updatePost(id, updatedPost);
    const blog = yield blogRepository_1.BlogRepository.getBlogById(blogId);
    const post = yield postRepository_1.PostRepository.getPostById(id);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const newPostView = Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    res.status(types_1.Status.NoContent_204).json(newPostView);
}));
exports.postRouter.delete("/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const post = yield postRepository_1.PostRepository.getPostById(id);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
    }
    const isDeleted = yield postRepository_1.PostRepository.deletePost(req.params.id);
    if (!isDeleted) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    res.sendStatus(types_1.Status.NoContent_204);
}));
