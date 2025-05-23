import express from "express";
import { PostQueryInput } from "../../../posts/routes/input/post-query.input";
import { postsService } from "../../../posts/application/posts.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { blogsService } from "../../application/blogs.service";
import { mapToPostListPaginatedOutput } from "../../../posts/routes/mappers/map-to-post-list-paginated-output";

export const getBlogPostListHandler = async (
  req: express.Request<{ id: string }, {}, {}, PostQueryInput>,
  res: express.Response
) => {
  const blogId = req.params.id;
  const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
  const { items: posts, totalCount } = await postsService.findMany({
    ...queryInput,
    blogId,
  });
  const blog = await blogsService.findByIdOrFail(blogId);
  const blogDict = {
    [blog._id.toString()]: blog,
  };

  const postListOutput = mapToPostListPaginatedOutput(posts, blogDict, {
    pageNumber: queryInput.pageNumber,
    pageSize: queryInput.pageSize,
    totalCount,
  });
  res.status(HttpStatus.Ok).json(postListOutput);

  res.status(HttpStatus.Ok).json(posts);
};
