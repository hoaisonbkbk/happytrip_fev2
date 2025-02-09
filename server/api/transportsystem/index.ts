import TransportService from "~/services/TransportService";

export default defineEventHandler(async (event) => {
    try {
        // Đọc thông tin 
        const body = await readBody(event);
        const query = getQuery(event);
        // Đọc thông tin access token 
        const accessToken = event.node.req.headers['authorization'];

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        // Kiểm tra dữ liệu có hợp lệ không
        if (!body) {
            return {
                status: 400,
                message: "Chưa cung cấp dữ liệu filters"
            }
        }
        if (!query) {
            return {
                status: 400,
                message: "Chưa cung cấp dữ liệu query"
            }
        }
        // Gửi dữ liệu về server
        const response = await TransportService.ListWithFilter(headers, query, body);
        return response;
    } catch (error: any) {
        console.error(error);
        // ✅ Trả về lỗi có `status` & `message`
        throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
    }

});
