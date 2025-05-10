import { UserOutput } from "./user.output";

export type UserListPaginatedOutput = {
  pageCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserOutput[];
};
