import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { usersService } from "../../domain/users.service";
import { QueryUserRequestDTO } from "../../types/query.user.request-dto";
import { mapToUserListPaginatedOutput } from "../mappers/map-to-user-list-paginated-output";

export const getUserListHandler = async (
  req: express.Request<{}, {}, {}, QueryUserRequestDTO>,
  res: express.Response
) => {
  try {
    const queryDTO = setDefaultSortAndPaginationIfNotExist(req.query);
    const { items, totalCount } = await usersService.findMany(queryDTO);
    const userListOutput = mapToUserListPaginatedOutput(items, {
      pageNumber: queryDTO.pageNumber,
      pageSize: queryDTO.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).json(userListOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
