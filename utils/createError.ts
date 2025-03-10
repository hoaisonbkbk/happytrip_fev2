// Định nghĩa các mã lỗi chuẩn
export const ErrorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// Type cho error options
export type ErrorOptions = {
  statusCode: number;
  statusMessage: string;
  stack?: string;
  cause?: Error;
  data?: Record<string, unknown>;
};

/**
 * Tạo error chuẩn cho toàn bộ ứng dụng
 * @param options - Các tùy chọn cho error
 * @returns Error đã được chuẩn hóa
 */
export const createError = (options: ErrorOptions): Error & ErrorOptions => {
  const error = new Error(options.statusMessage) as Error & ErrorOptions;
  
  // Gán các thuộc tính chuẩn
  error.statusCode = options.statusCode;
  error.statusMessage = options.statusMessage;
  
  // Gán stack trace nếu có
  if (options.stack) {
    error.stack = options.stack;
  }

  // Gán cause nếu có
  if (options.cause) {
    error.cause = options.cause;
  }

  // Gán data bổ sung nếu có
  if (options.data) {
    error.data = options.data;
  }

  return error;
};

/**
 * Helper functions để tạo các loại error phổ biến
 */
export const createBadRequestError = (message: string, data?: Record<string, unknown>) => 
  createError({
    statusCode: ErrorCodes.BAD_REQUEST,
    statusMessage: message,
    data
  });

export const createUnauthorizedError = (message = 'Unauthorized') =>
  createError({
    statusCode: ErrorCodes.UNAUTHORIZED,
    statusMessage: message
  });

export const createNotFoundError = (resource: string) =>
  createError({
    statusCode: ErrorCodes.NOT_FOUND,
    statusMessage: `${resource} not found`
  }); 