export abstract class PaginatedViewDto<T> {
  items: T;
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;

  public static mapToView<T>(data: {
    items: T;
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
  }): PaginatedViewDto<T> {
    return {
      items: data.items,
      pagesCount: data.pagesCount,
      page: data.page,
      pageSize: data.pageSize,
      totalCount: data.totalCount,
    };
  }
}
