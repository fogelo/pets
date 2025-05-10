import express from "express";
import { UserQueryInput } from "../input/user-query.input";
import { usersService } from "../../application/users.service";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { mapToUserListPaginatedOutput } from "../mappers/map-to-post-list-paginated-output";
import { HttpStatus } from "../../../../core/types/http-statuses";

export const getUserListHandler = async (
  req: express.Request<{}, {}, {}, UserQueryInput>,
  res: express.Response
) => {
  const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
  const { items, totalCount } = await usersService.findMany(queryInput);
  const userListOutput = mapToUserListPaginatedOutput(items, {
    pageNumber: queryInput.pageNumber,
    pageSize: queryInput.pageSize,
    totalCount,
  });
  res.status(HttpStatus.Ok).json(userListOutput);
};
