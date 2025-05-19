import { WithId } from "mongodb";
import { UserListPaginatedModel } from "../../types/user-list-paginated.output";
import { mapToUserResponse } from "./map-to-user-output";
import { User } from "../../types/user";

export function mapToUserListPaginatedOutput(
  users: WithId<User>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): UserListPaginatedModel {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: users.map(mapToUserResponse),
  };
}
