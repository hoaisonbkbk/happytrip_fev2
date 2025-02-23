import OrderService from "~/services/OrderService";

export default defineEventHandler(async (event) => { 

    // Đọc thông tin từ request
    try {
        
        const id = event.context.params?.id as string;
        if (!id) {
            throw createError({ statusCode: 400, statusMessage: "Missing ID" });
          }
        console.log('id',id);
        // Đọc thông tin tử request
        const accessToken = getHeader(event, 'Authorization') as string;
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
        }
        
        // Gọi API lấy danh sách
        var rs = await OrderService.GetDetail(id,headers);
        return rs;
    } catch (error: any) {
        return {
            status: error.status || 500,
            message: error.message || "Lỗi không xác định!"
        }
    }
})