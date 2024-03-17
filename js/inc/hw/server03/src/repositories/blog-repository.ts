import { ObjectId } from "mongodb";
import { blogsCollection } from "../db/db";
import { BlogDbType } from "../models/db/blog-db";
import { blogMapper } from "../models/mappers/blog-mapper";
import { BlogOutputModel } from "../models/output/blog-output-model";
import { CreateBlogModel } from "../models/input/blog/create-blog-input-model";

export class BlogRepository {
  static async getAllBlogs(): Promise<BlogOutputModel[]> {
    const blogs = await blogsCollection.find<BlogDbType>({}).toArray();
    return blogs.map(blogMapper);
  }
  static async getBlogById(id: string) {
    const blog = await blogsCollection.findOne<BlogDbType>({
      _id: new ObjectId(id),
    });
    if (!blog) return null;
    return blogMapper(blog);
  }
  static async createBlog(blog: CreateBlogModel): Promise<string> {
    const res = await blogsCollection.insertOne(blog);
    return res.insertedId.toString();
  }
  static async updateBlog(id: string, blog: CreateBlogModel): Promise<boolean> {
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
