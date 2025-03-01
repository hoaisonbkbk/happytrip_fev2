import CityService from "~/services/CityService";

export default defineEventHandler(async (event) => {
    try {
        
        // Đọc thông tin từ request
        const body = await readBody(event);

        // Đọc dữ liệu từ headers request gửi đến. Yêu cầu truy tìm dữ liệu
        const accessToken = event.node.req.headers['authorization'];
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        
        // Đọc thông tin query parameters
        const query = getQuery(event);
        // Đọc thiếu thông tin body trên request
        console.log('query',query);
        if (!query) {
            return {
                status: 400,
                message: "Chưa cung cấp dữ liệu query"
            }
        }
        // Gửi dữ liệu về server
        const response = await CityService.GetListWithFilter(headers, query, body);
        return response;
    } catch (error: any) {
        console.error(error);
        // ✅ Trả về lỗi có `status` & `message`
        throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
    }

})