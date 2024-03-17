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
exports.PostRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const postMapper_1 = require("../models/mappers/postMapper");
class PostRepository {
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield db_1.postsCollection.find({}).toArray();
            return posts.map(postMapper_1.postMapper);
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection.findOne({
                _id: new mongodb_1.ObjectId(id),
            });
            if (!post)
                return null;
            return (0, postMapper_1.postMapper)(post);
        });
    }
    static createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postsCollection.insertOne(post);
            return res.insertedId.toString();
        });
    }
    static updatePost(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                },
            });
            return !!res.matchedCount;
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!res.deletedCount;
        });
    }
}
exports.PostRepository = PostRepository;
