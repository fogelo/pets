import { WithId } from "mongodb";
import { Post } from "../../domain/post";
import { PostListPaginatedOutput } from "../output/post-list-paginated.output";
import { mapToPostOutput } from "./map-to-post-output";
import { Blog } from "../../../blogs/domain/blog";

export function mapToPostListPaginatedOutput(
  posts: WithId<Post & { blogName: string }>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): PostListPaginatedOutput {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: posts.map(mapToPostOutput),
  };
}
