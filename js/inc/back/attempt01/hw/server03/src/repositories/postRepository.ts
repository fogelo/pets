import { ObjectId } from "mongodb";
import { postsCollection } from "../db/db";
import { PostDbModel } from "../models/db/postDbModel";
import { CreatePostInputModel } from "../models/input/post/createPostInputModel";
import { UpdatePostInputModel } from "../models/input/post/updatePostInputModel";
import { postMapper } from "../models/mappers/postMapper";
import { PostOutputModel } from "../models/output/postOutputModel";

export class PostRepository {
  static async getAllPosts(): Promise<
    (Omit<PostDbModel, "_id"> & { id: string })[]
  > {
    const posts = await postsCollection.find<PostDbModel>({}).toArray();
    return posts.map(postMapper);
  }
  static async getPostById(
    id: string
  ): Promise<(Omit<PostDbModel, "_id"> & { id: string }) | null> {
    const post = await postsCollection.findOne<PostDbModel>({
      _id: new ObjectId(id),
    });
    if (!post) return null;
    return postMapper(post);
  }
  static async createPost(post: CreatePostInputModel): Promise<string> {
    const res = await postsCollection.insertOne(post);
    return res.insertedId.toString();
  }
  static async updatePost(
    id: string,
    post: UpdatePostInputModel
  ): Promise<boolean> {
    const res = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: post.title,
          shortDescription: post.shortDescription,
          content: post.content,
          blogId: post.blogId,
        },
      }
    );
    return !!res.matchedCount;
  }
  static async deletePost(id: string) {
    const res = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return !!res.deletedCount;
  }
}
