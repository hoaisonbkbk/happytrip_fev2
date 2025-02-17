import TransactionService from "~/services/TransactionService";

export default defineEventHandler(async (event) => {
    // Đọc thông tin tử request
    var query = getQuery(event);
    var id = query.id as string;
    // Đọc thông tin từ header để lấy token
    var accessToken = getHeader(event, 'Authorization') as string;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    // Kiểm tra xem id có tồn tại không
    if (!id) {
        return {
            status: 400,
            message: "Chưa cung cấp id"
        }
    }
    // Gửi dữ liệu về server
    try {
        const response = await TransactionService.GetDetail(id, headers);
        return response;
    } catch (error: any) {
        return {
            status: error.status || 500,
            message: error.message || "Lỗi không xác định!"
        }
    }
})