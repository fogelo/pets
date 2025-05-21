import { UserResponse } from "./user.response";

export type UserListPaginatedModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserResponse[];
};
