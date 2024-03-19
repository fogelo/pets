import { ObjectId } from "mongodb";
import { blogsCollection, postsCollection } from "../db/db";
import { PostDbModel } from "../models/db/post.db.model";
import { blogMapper } from "../models/mappers/blog.mapper";
import { postMapper } from "../models/mappers/post.mapper";
import { PostOutputModel } from "../models/output/post.output.model";

export class PostQueryRepository {
  static async getAllPosts(): Promise<
    (Omit<PostDbModel, "_id"> & { id: string })[]
  > {
    const dbPosts = await postsCollection.find({}).toArray();
    const mappedPosts = dbPosts.map(postMapper);
    const blogObjectIds = [
      ...new Set(dbPosts.map((dbPost) => new ObjectId(dbPost.blogId))),
    ];
    const blogs = await blogsCollection
      .find({ _id: { $in: blogObjectIds } })
      .toArray();

    const mappedBlogs = blogs.map(blogMapper);

    const posts: PostOutputModel[] = mappedPosts.map((post) => {
      const blog = mappedBlogs.find((blog) => blog.id === post.blogId);
      return {
        ...post,
        blogName: blog ? blog.name : "",
      };
    });

    return posts;
  }
  static async getPostById(
    id: string
  ): Promise<(Omit<PostDbModel, "_id"> & { id: string }) | null> {
    const post = await postsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!post) return null;
    return postMapper(post);
  }
}
