import iHappytripService, { iHappyTripService } from "~/services/iHappytripService";

export default defineEventHandler(async (event) => {
    // Đọc thông tin token từ request gửi đến
    // Lấy thông tin access_token từ header Authorization
    const accessToken = event.node.req.headers['authorization'] || "";

    // Kiểm tra xem có token gửi đến không
    if (!accessToken) {
        return {
            status: 401,
            body: {
                message: "Unauthorized"
            }
        }
    }
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    // Lấy thông tin từ query gửi đến
    var query = getQuery(event);
    // Lấy thông tin từ body gửi đến
    var body = await readBody(event);

    // Gọi service để lấy dữ liệu
    try {
        return await iHappytripService.GetListWithFilter(
            query,
            headers,
            body
        );
    } catch (error: any) {
        return {
            status: error.status || 500,
            body: {
                message: error.message || "Lỗi không xác định!"
            }
        }
    }
})