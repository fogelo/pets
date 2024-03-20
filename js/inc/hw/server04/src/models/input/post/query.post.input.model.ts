export type QueryPostInputModel = {
  searchNameTerm?: string | null;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};
