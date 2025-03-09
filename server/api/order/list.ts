import OrderService from "~/services/OrderService";

export default defineEventHandler(async (event) => {
  const { getAuthHeaders, validateRequest, handleError } = useApiHandler();

  try {
    const query = getQuery(event);
    const body = await readBody(event);
    const accessToken = getHeader(event, 'Authorization');

    if (!accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Missing access token'
      });
    }

    validateRequest(query, body);

    const headers = getAuthHeaders(accessToken);
    const response = await OrderService.GetListWithFilter(query, headers, body);

    if (!response) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy dữ liệu'
      });
    }

    return response;
  } catch (error: any) {
    handleError(error);
  }
});