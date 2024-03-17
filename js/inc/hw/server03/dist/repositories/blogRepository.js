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
exports.BlogRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const blogMapper_1 = require("../models/mappers/blogMapper");
class BlogRepository {
    static getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.blogsCollection.find({}).toArray();
            return blogs.map(blogMapper_1.blogMapper);
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({
                _id: new mongodb_1.ObjectId(id),
            });
            if (!blog)
                return null;
            return (0, blogMapper_1.blogMapper)(blog);
        });
    }
    static createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogsCollection.insertOne(blog);
            return res.insertedId.toString();
        });
    }
    static updateBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                },
            });
            return !!res.matchedCount;
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!res.deletedCount;
        });
    }
}
exports.BlogRepository = BlogRepository;
