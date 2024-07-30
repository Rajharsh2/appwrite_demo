export interface ServerActionSuccessResponse<T> {
  type: 'success';
  data: T;
  count?: number;
}

export interface ServerActionErrorResponse {
  type: 'error';
  errors: any;
}

export type ServerActionResponse<T> =
  | ServerActionSuccessResponse<T>
  | ServerActionErrorResponse;

export interface SearchParams {
  userId?: string;
  token?: string;
  /**
   * The search query.
   */
  query?: string;
  /**
   * The page number.
   */
  page?: string;
  /**
   * The limit of items per page
   */
  limit?: string;
}

export interface GetAllQueryParams {
  searchInput?: string;
  userId?: string;
  token?: string;
  page?: number;
  limit?: number;
  // sortBy?: SortBy;
  // sortOrder?: SortOrder;
  role?: string;
  location?: string;
  status?: string;
  typeOfEntity?: string;
  category?: string[];
}
