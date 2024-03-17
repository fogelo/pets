"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMapper = void 0;
const postMapper = (post) => {
    return {
        id: post._id.toString(),
        title: post.title,
        content: post.content,
        shortDescription: post.shortDescription,
        blogId: post.blogId,
        createdAt: post.createdAt,
    };
};
exports.postMapper = postMapper;
