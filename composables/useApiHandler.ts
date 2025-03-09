type ApiHeaders = {
  'Content-Type': string;
  Authorization: string;
  'X-Request-Id': string;
};

type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

export const useApiHandler = () => {
  const getAuthHeaders = (token: string): ApiHeaders => {
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Missing authentication token'
      });
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      'X-Request-Id': generateRequestId(),
    };
  };

  const validateRequest = (query?: any, body?: any) => {
    // Kiểm tra query
    if (query) {
      if (typeof query !== 'object') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Query phải là một object'
        });
      }
      
      // Kiểm tra các trường bắt buộc
      const requiredFields = ['page', 'limit'];
      for (const field of requiredFields) {
        if (!(field in query)) {
          throw createError({
            statusCode: 400,
            statusMessage: `Thiếu trường ${field} trong query`
          });
        }
      }
    }

    // Kiểm tra body
    if (body) {
      if (typeof body !== 'object') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Body phải là một object'
        });
      }
    }
  };

  const handleError = (error: any) => {
    if (error.statusCode) throw error;

    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Lỗi không xác định'
    });
  };

  const formatResponse = <T>(data: T): ApiResponse<T> => ({
    data,
    status: 200
  });

  return {
    getAuthHeaders,
    validateRequest,
    handleError,
    formatResponse
  };
}; 