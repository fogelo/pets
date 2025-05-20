import express from "express";
import { PostQueryInput } from "../input/post-query.input";
import { postsService } from "../../application/posts.service";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { mapToPostListPaginatedOutput } from "../mappers/map-to-post-list-paginated-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const getPostListHandler = async (
  req: express.Request<{}, {}, {}, PostQueryInput>,
  res: express.Response
) => {
  try {
    const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
    const { items: posts, totalCount } = await postsService.findMany(
      queryInput
    );

    const postListOutput = mapToPostListPaginatedOutput(posts, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(HttpStatus.Ok).json(postListOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
