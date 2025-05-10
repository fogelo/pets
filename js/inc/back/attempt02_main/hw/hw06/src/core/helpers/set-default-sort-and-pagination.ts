import { paginationAndSortingDefault } from "../middlewares/query-pagination-sorting.validation-middleware";
import { PaginationAndSorting } from "../types/pagination-and-sorting";

export function setDefaultSortAndPaginationIfNotExist<S = string>(
  query: Partial<PaginationAndSorting<S>>
): PaginationAndSorting<S> {
  return {
    ...paginationAndSortingDefault,
    ...query,
    sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as S,
  };
}
