"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const post_validators_1 = require("../validators/post-validators");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get("/", (req, res) => {
    const dbPosts = blog_repository_1.PostRepository.getAllPosts();
    const dbBlogs = blog_repository_1.BlogRepository.getAllBlogs();
    const posts = dbPosts.map((post) => {
        const blog = dbBlogs.find((blog) => blog.id === post.blogId);
        return Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    });
    res.status(types_1.Status.Ok_200).json(posts);
});
exports.postRouter.get("/:id", (req, res) => {
    const post = blog_repository_1.PostRepository.getPostById(req.params.id);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const blog = blog_repository_1.BlogRepository.getBlogById(post.blogId);
    const viewPost = Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    res.status(types_1.Status.Ok_200).json(viewPost);
});
exports.postRouter.post("/", auth_middleware_1.authMiddleware, (0, post_validators_1.postValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const { title, content, shortDescription, blogId } = req.body;
    const newPostDb = {
        id: new Date().getTime().toString(),
        title,
        content,
        shortDescription,
        blogId,
    };
    blog_repository_1.PostRepository.createPost(newPostDb);
    const blog = blog_repository_1.BlogRepository.getBlogById(blogId);
    const newPostView = Object.assign(Object.assign({}, newPostDb), { blogName: blog ? blog.name : "" });
    res.status(types_1.Status.Created_201).json(newPostView);
});
exports.postRouter.put("/:id", auth_middleware_1.authMiddleware, (0, post_validators_1.postValidation)(), inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const { title, content, shortDescription, blogId } = req.body;
    const updatedPost = {
        title,
        content,
        shortDescription,
        blogId,
    };
    blog_repository_1.PostRepository.updatePost(req.params.id, updatedPost);
    const blog = blog_repository_1.BlogRepository.getBlogById(blogId);
    const post = blog_repository_1.PostRepository.getPostById(req.params.id);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
        return;
    }
    const newPostView = Object.assign(Object.assign({}, post), { blogName: blog ? blog.name : "" });
    res.status(types_1.Status.Created_201).json(newPostView);
});
exports.postRouter.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    const post = blog_repository_1.PostRepository.getPostById(req.params.id);
    if (!post) {
        res.sendStatus(types_1.Status.NotFound_404);
    }
    blog_repository_1.PostRepository.deletePost(req.params.id);
    res.sendStatus(types_1.Status.NoContent_204);
});
