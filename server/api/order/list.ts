import OrderService from "~/services/OrderService";
import { createError } from "~/utils/createError";

export default defineEventHandler(async (event) => {
    try {
        // Đọc thông tin từ request
        const body = await readBody(event);
        const query = getQuery(event);
        const accessToken = getHeader(event, 'Authorization') as string;
        
        if (!accessToken) {
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized - Missing access token"
            });
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
        };

        // Gọi API lấy danh sách
        const response = await OrderService.GetListWithFilter(query, headers, body);
        
        if (!response) {
            throw createError({
                statusCode: 404,
                statusMessage: "Không tìm thấy dữ liệu!"
            });
        }

        return response;
    } catch (error: any) {
        throw createError({
            statusCode: error.status || 500,
            statusMessage: error.message || "Lỗi không xác định!"
        });
    }
});