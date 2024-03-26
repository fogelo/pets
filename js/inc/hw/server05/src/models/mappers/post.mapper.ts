import { WithId } from "mongodb";
import { PostDbModel } from "../db/post.db.model";

export const postMapper = (
  post: WithId<PostDbModel & { blogName: string }>
): Omit<PostDbModel, "blogId"> & {
  id: string;
  blogId: string;
  blogName: string;
} => {
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    shortDescription: post.shortDescription,
    blogId: post.blogId.toString(),
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};
