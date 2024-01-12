import { IBlogDb, IPostDb, db } from "../db/db";

export class BlogRepository {
  static getAllBlogs() {
    return db.blogs;
  }
  static getBlogById(id: string) {
    const blog = db.blogs.find((blog) => blog.id === id);
    return blog || null;
  }
  static createBlog(blog: IBlogDb) {
    db.blogs.push(blog);
  }
  static updateBlog(blog: IBlogDb) {
    db.blogs = db.blogs.map((dbBlog) =>
      dbBlog.id === blog.id ? blog : dbBlog
    );
  }
  static deleteBlog(id: string) {
    db.blogs = db.blogs.filter((blog) => blog.id !== id);
  }
}

export class PostRepository {
  static getAllPosts() {
    return db.posts;
  }
  static getPostById(id: string) {
    const post = db.posts.find((post) => post.id === id);
    return post || null;
  }
  static createPost(post: IPostDb) {
    db.posts.push(post);
  }
  static updatePost(post: IPostDb) {
    db.posts = db.posts.map((dbPost) =>
      dbPost.id === post.id ? post : dbPost
    );
  }
  static deletePost(id: string) {
    db.posts = db.posts.filter((post) => post.id !== id);
  }
}
