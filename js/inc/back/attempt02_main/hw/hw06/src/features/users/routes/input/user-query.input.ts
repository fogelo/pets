import { PaginationAndSorting } from "../../../../core/types/pagination-and-sorting";
import { UserSortFieldEnum } from "./user-sort-field";

export type UserQueryInput = PaginationAndSorting<UserSortFieldEnum> & {
  searchLoginTerm?: string;
};
