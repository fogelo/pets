import express from "express";
import { PostQueryInput } from "../input/post-query.input";
import { postsService } from "../../application/posts.service";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { mapToPostListPaginatedOutput } from "../mappers/map-to-post-list-paginated-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { blogsService } from "../../../blogs/application/blogs.service";

export const getPostListHandler = async (
  req: express.Request<{}, {}, {}, PostQueryInput>,
  res: express.Response
) => {
  const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
  const { items: posts, totalCount } = await postsService.findMany(queryInput);
  const blogIds = [...new Set(posts.map((p) => p.blogId))];
  const blogs = await blogsService.findByIdsOrFail(blogIds);
  const blogDict = Object.fromEntries(
    blogs.map((blog) => [blog._id.toString(), blog])
  );
  const postListOutput = mapToPostListPaginatedOutput(posts, blogDict, {
    pageNumber: queryInput.pageNumber,
    pageSize: queryInput.pageSize,
    totalCount,
  });
  res.status(HttpStatus.Ok).json(postListOutput);
};
