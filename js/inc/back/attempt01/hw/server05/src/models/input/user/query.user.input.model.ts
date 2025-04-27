export type QueryUserInputModel = {
    searchLoginTerm?: string | null;
    searchEmailTerm?: string | null;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    pageNumber?: number;
    pageSize?: number;
  };
 