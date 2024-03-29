import { IBlogDb, db } from "../db/db";

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

