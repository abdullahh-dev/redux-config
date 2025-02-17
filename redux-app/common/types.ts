export type ServerResponse<R = any> = {
  data: R;
  message: string;
  path: string;
  status: boolean;
  statusCode: HttpStatusCode;
};

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  take: number;
  currentPage: number;
  totalPages: number;
  remainingPages: number;
};
