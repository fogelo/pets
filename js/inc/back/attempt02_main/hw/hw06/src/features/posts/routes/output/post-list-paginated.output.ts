import { PostOutput } from "./post.output";

export type PostListPaginatedOutput = {
  pageCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutput[];
};
