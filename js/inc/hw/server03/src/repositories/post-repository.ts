import { ObjectId, WithId } from "mongodb";
import { postsCollection } from "../db/db";
import { PostDbType } from "../models/db/post-db";
import { CreatePostInputModel } from "../models/input/post/create-post-input-model";
import { UpdatePostInputModel } from "../models/input/post/update-post-input-model";
import { postMapper } from "../models/mappers/post-mapper";
import { PostOutputModel } from "../models/output/post-output-model";

export class PostRepository {
  static async getAllPosts(): Promise<PostOutputModel[]> {
    const posts = await postsCollection.find<PostDbType>({}).toArray();
    return posts.map(postMapper);
  }
  static async getPostById(id: string): Promise<PostOutputModel | null> {
    const post = await postsCollection.findOne<PostDbType>({
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
