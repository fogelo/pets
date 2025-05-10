import { BlogOutput } from "./blog.output";

export type BlogListPaginatedOutput = {
  pageCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogOutput[];
};
