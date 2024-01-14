import { db, IPostDb } from "../db/db";
import { IPostInputModel } from "../types";


export class PostRepository {
  static getAllPosts() {
    return db.posts;
  }
  static getPostById(id: string) {
    const post = db.posts.find((post) => post.id === id);
    return post;
  }
  static createPost(post: IPostDb) {
    db.posts.push(post);
  }
  static updatePost(id: string, post: IPostInputModel) {
    db.posts = db.posts.map((dbPost) => dbPost.id === id ? { ...dbPost, post } : dbPost
    );
  }
  static deletePost(id: string) {
    db.posts = db.posts.filter((post) => post.id !== id);
  }
}
