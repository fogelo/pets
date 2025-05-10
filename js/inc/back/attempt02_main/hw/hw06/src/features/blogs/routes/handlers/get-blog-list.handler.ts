import express from "express";
import { BlogQueryInput } from "../input/blog-query.input";
import { blogsService } from "../../application/blogs.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { mapToBlogListPaginatedOutput } from "../mappers/map-to-blog-list-paginated-output";

export const getBlogListHandler = async (
  req: express.Request<{}, {}, {}, BlogQueryInput>,
  res: express.Response
) => {
  const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
  const { items, totalCount } = await blogsService.findMany(queryInput);
  const blogListOutput = mapToBlogListPaginatedOutput(items, {
    pageNumber: queryInput.pageNumber,
    pageSize: queryInput.pageSize,
    totalCount,
  });
  res.status(HttpStatus.Ok).json(blogListOutput);
};
