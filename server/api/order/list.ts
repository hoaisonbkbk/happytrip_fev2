import OrderService from "~/services/OrderService";

export default defineEventHandler(async (event) => {
    try {
        // Đọc thông tin từ request
        const body = await readBody(event);
        const query = getQuery(event);
        const accessToken = getHeader(event, 'Authorization') as string;
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
        }
        // Kiểm tra dữ liệu bắn đến có hợp lệ không
        if(!query) throw createError({
            statusCode: 400,
            statusMessage: "Thiếu thông tin query!"
        });
        if(!body) throw createError({
            statusCode: 400,
            statusMessage: "Thiếu thông tin body!"
        });
        console.log('query',query);
        // Gọi API lấy danh sách
        var rs = await OrderService.GetListWithFilter(query,headers,body);
       /** Lấy dữ liệu ở đây thôi. Nếu muốn xử lý nghiệp vụ và giấu API thì ở đây cũng được. Ở dây gọi tới service */
        if(!rs) throw createError({
            statusCode: 400,
            statusMessage: "Không tìm thấy dữ liệu!"
        })
        return rs;
    } catch (error: any) {
        return createError({
            statusCode: error.status || 500,
            message: error.message || "Lỗi không xác định!"
        })
    }
})