import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting";
import { UserSortFieldEnum } from "./user-sort-field";

export type QueryUserRequestDTO = PaginationAndSorting<UserSortFieldEnum> & {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
};
