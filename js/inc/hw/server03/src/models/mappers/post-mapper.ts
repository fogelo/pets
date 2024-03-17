import { PostDbType } from "../db/post-db";
import { PostOutputModel } from "../output/post-output-model";

export const postMapper = (post: PostDbType): PostOutputModel => {
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    shortDescription: post.shortDescription,
    blogId: post.blogId,
  };
};
