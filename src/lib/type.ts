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
