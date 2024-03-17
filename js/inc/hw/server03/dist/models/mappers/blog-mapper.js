"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogMapper = void 0;
const blogMapper = (blog) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
    };
};
exports.blogMapper = blogMapper;
