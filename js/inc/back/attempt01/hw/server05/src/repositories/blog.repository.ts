import { ObjectId } from "mongodb";
import { blogsCollection } from "../db/db";
import { BlogDbModel } from "../models/db/blog.db.model";
import { CreateBlogInputModel } from "../models/input/blog/create.blog.input.model";

export class BlogRepository {
  static async createBlog(blog: BlogDbModel): Promise<string> {
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
