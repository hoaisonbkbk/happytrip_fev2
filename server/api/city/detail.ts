import CityService from "~/services/CityService";

export default defineEventHandler(async (event) => {
    try {
        // Lấy thông tin query
        const query = getQuery(event);
        const id = query.id as string;


        // Đọc thông tin header lấy token
        const accessToken = getHeader(event, 'Authorization');
        const token = accessToken?.split(' ')[1];
        // Tạo header
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        // Kiểm tra xem id có tồn tại không

        if (!id) {
            return {
                status: 400,
                message: 'ID không tồn tại'
            }
        }

        // Lấy chi tiết thành phố
        const cityDetail = await CityService.DetailById(id, headers);
        if (!cityDetail) {
            return {
                status: 400,
                message: 'Không tìm thấy thành phố'
            }
        }
        return cityDetail;
    } catch (error: any) {
        return {
            status: error.status || 500,
            message: error.message || "Lỗi không xác định!" 
        }
    }

});
