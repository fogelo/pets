import { WithId } from "mongodb";
import { Post } from "../../domain/post";
import { PostListPaginatedOutput } from "../output/post-list-paginated.output";
import { mapToPostOutput } from "./map-to-post-output";
import { Blog } from "../../../blogs/domain/blog";

export function mapToPostListPaginatedOutput(
  posts: WithId<Post>[],
  blogDict: { [k: string]: WithId<Blog> },
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): PostListPaginatedOutput {
  const postsOutput = posts.map((post) => {
    const blog = blogDict[post.blogId];
    return mapToPostOutput(post, blog);
  });
  return {
    pageCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: postsOutput,
  };
}
