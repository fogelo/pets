import { WithId } from "mongodb";
import { User } from "../../domain/user";
import { UserListPaginatedOutput } from "../output/user-list-paginated.output";
import { mapToUserOutput } from "./map-to-user-output";

export function mapToUserListPaginatedOutput(
  users: WithId<User>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): UserListPaginatedOutput {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: users.map(mapToUserOutput),
  };
}
