export type ApiError = {
  statusCode: number;
  statusMessage: string;
  stack?: string;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}; 