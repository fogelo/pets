import { paginationAndSortingDefault } from "../middlewares/query-pagination-sorting.validation-middleware";
import { PaginationAndSorting } from "../types/pagination-and-sorting";

export function setDefaultSortAndPaginationIfNotExist<S = string>(
  query: Partial<PaginationAndSorting<S>>
): PaginationAndSorting<S> {
  const defaultSortAndPagination = {
    pageNumber: query.pageNumber
      ? Number(query.pageNumber)
      : paginationAndSortingDefault.pageNumber,
    pageSize: query.pageSize
      ? Number(query.pageSize)
      : paginationAndSortingDefault.pageSize,
    sortDirection:
      query.sortDirection ?? paginationAndSortingDefault.sortDirection,
    sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as S,
  };
  return defaultSortAndPagination;
}
