import TransportService from "~/services/TransportService";

export default defineEventHandler(async (event) => {
    
    // Lấy query parameters
    const query = getQuery(event);
    const id = query.id as string;

    // Lấy headers nếu cần
    const headers = event.node.req.headers;
    const accessToken = headers['authorization'];

    // Xử lý logic với id
    if (!id) {
        return {
            status: 400,
            message: "Chưa cung cấp id"
        }
    }
    if (!accessToken) {
        return {
            status: 400,
            message: "Chưa cung cấp access token"
        }
    }
    try {
        const response = await TransportService.GetById(id, {
            'Authorization': accessToken

        });
        return response;
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            message: error.message
        });
    }
}); 