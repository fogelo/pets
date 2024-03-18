import { ObjectId } from "mongodb";
import { blogsCollection } from "../db/db";
import { BlogDbModel } from "../models/db/blogDbModel";
import { blogMapper } from "../models/mappers/blogMapper";
import { BlogOutputModel } from "../models/output/blogOutputModel";
import { CreateBlogInputModel } from "../models/input/blog/createBlogInputModel";

export class BlogRepository {
  static async getAllBlogs(): Promise<BlogOutputModel[]> {
    const blogs = await blogsCollection.find<BlogDbModel>({}).toArray();
    return blogs.map(blogMapper);
  }
  static async getBlogById(id: string) {
    const blog = await blogsCollection.findOne<BlogDbModel>({
      _id: new ObjectId(id),
    });
    if (!blog) return null;
    return blogMapper(blog);
  }
  static async createBlog(blog: CreateBlogInputModel): Promise<string> {
    const res = await blogsCollection.insertOne(blog);
    return res.insertedId.toString();
  }
  
  static async updateBlog(id: string, blog: CreateBlogInputModel): Promise<boolean> {
    const res = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: blog.name,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
        },
      }
    );
    return !!res.matchedCount;
  }
  static async deleteBlog(id: string) {
    const res = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    return !!res.deletedCount;
  }
}
