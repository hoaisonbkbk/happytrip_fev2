import OrderService from "~/services/OrderService";

export default defineEventHandler(async (event) => {
  try {
    // Destructuring params
    const { id } = event.context.params || {};
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing order ID'
      });
    }

    const accessToken = getHeader(event, 'Authorization');
    
    if (!accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Missing access token'
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken
    };

    // Gọi service để lấy chi tiết đơn hàng
    return await OrderService.GetDetail(id, headers);

  } catch (error: any) {
    // Nếu đã là createError thì throw trực tiếp
    if (error.statusCode) {
      throw error;
    }

    // Xử lý các lỗi khác
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Lỗi không xác định'
    });
  }
});