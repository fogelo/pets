import { PostDbModel } from "../db/postDbModel";
import { PostOutputModel } from "../output/postOutputModel";

export const postMapper = (
  post: PostDbModel
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
