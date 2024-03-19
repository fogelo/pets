import { ObjectId } from "mongodb";
import { postsCollection } from "../db/db";
import { PostDbModel } from "../models/db/post.db.model";
import { UpdatePostInputModel } from "../models/input/post/update.post.input.model";

export class PostRepository {
  static async createPost(post: PostDbModel): Promise<string> {
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
