import { WithId } from "mongodb";
import { PostDbModel } from "../db/post.db.model";

export const postMapper = (
  post: WithId<PostDbModel>
): Omit<PostDbModel, "_id"> & { id: string } => {
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    shortDescription: post.shortDescription,
    blogId: post.blogId,
    createdAt: post.createdAt,
  };
};
