import express from "express";
import { BlogQueryInput } from "../input/blog-query.input";
import { blogsService } from "../../application/blogs.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { mapToBlogListPaginatedOutput } from "../mappers/map-to-blog-list-paginated-output";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const getBlogListHandler = async (
  req: express.Request<{}, {}, {}, BlogQueryInput>,
  res: express.Response
) => {
  try {
    const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
    const { items, totalCount } = await blogsService.findMany(queryInput);
    const blogListOutput = mapToBlogListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).json(blogListOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
