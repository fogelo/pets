import { WithId } from "mongodb";
import { Blog } from "../../domain/blog";
import { BlogListPaginatedOutput } from "../output/blog-list-paginated.output";
import { mapToBlogOutput } from "./map-to-blog-output";

export function mapToBlogListPaginatedOutput(
  blogs: WithId<Blog>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): BlogListPaginatedOutput {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: blogs.map(mapToBlogOutput),
  };
}
