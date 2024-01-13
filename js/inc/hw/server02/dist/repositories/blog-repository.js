"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = exports.BlogRepository = void 0;
const db_1 = require("../db/db");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static getBlogById(id) {
        const blog = db_1.db.blogs.find((blog) => blog.id === id);
        return blog || null;
    }
    static createBlog(blog) {
        db_1.db.blogs.push(blog);
    }
    static updateBlog(blog) {
        db_1.db.blogs = db_1.db.blogs.map((dbBlog) => dbBlog.id === blog.id ? blog : dbBlog);
    }
    static deleteBlog(id) {
        db_1.db.blogs = db_1.db.blogs.filter((blog) => blog.id !== id);
    }
}
exports.BlogRepository = BlogRepository;
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static getPostById(id) {
        const post = db_1.db.posts.find((post) => post.id === id);
        return post;
    }
    static createPost(post) {
        db_1.db.posts.push(post);
    }
    static updatePost(id, post) {
        db_1.db.posts = db_1.db.posts.map((dbPost) => dbPost.id === id ? Object.assign(Object.assign({}, dbPost), { post }) : dbPost);
    }
    static deletePost(id) {
        db_1.db.posts = db_1.db.posts.filter((post) => post.id !== id);
    }
}
exports.PostRepository = PostRepository;
