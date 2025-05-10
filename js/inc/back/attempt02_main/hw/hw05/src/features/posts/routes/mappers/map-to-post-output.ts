import { WithId } from "mongodb";
import { Post } from "../../domain/post";
import { PostOutput } from "../output/post.output";
import { Blog } from "../../../blogs/domain/blog";

export const mapToPostOutput = (
  post: WithId<Post>,
  blog: WithId<Blog>
): PostOutput => {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: blog._id.toString(),
    blogName: blog.name,
    createdAt: post.createdAt,
  };
};
