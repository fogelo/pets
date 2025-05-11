import { paginationAndSortingDefault } from "../middlewares/query-pagination-sorting.validation-middleware";
import { PaginationAndSorting } from "../types/pagination-and-sorting";

export function setDefaultSortAndPaginationIfNotExist<S = string>(
  query: Partial<PaginationAndSorting<S>>
): PaginationAndSorting<S> {
  return {
    pageNumber: query.pageNumber
      ? Number(query.pageNumber)
      : paginationAndSortingDefault.pageNumber,
    pageSize: query.pageNumber
      ? Number(query.pageNumber)
      : paginationAndSortingDefault.pageNumber,
    sortDirection:
      query.sortDirection ?? paginationAndSortingDefault.sortDirection,
    sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as S,
  };
}
