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
    blogId: blog._id.toString(),
    blogName: blog.name,
    content: post.content,
    createdAt: post.createdAt,
    shortDescription: post.shortDescription,
    title: post.title,
  };
};
