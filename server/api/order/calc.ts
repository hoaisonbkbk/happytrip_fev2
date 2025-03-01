import OrderService from "~/services/OrderService";

export default defineEventHandler(async (event) => {
      try {
            // Đọc thông tin access_token từ request
            const accessToken = getHeader(event, 'Authorization') as string;
            // Đọc thông tin body
            const body = await readBody(event);
            if(!body) throw createError({ statusCode: 400, statusMessage: "Thiếu thông tin body!" });
            // Kiểm tra thông tin token
            if (!accessToken) throw createError({ statusCode: 401, statusMessage: "Thiếu thông tin xác thực!" });
            var rs = await OrderService.CalculateAsync(body, { 'Authorization': `${accessToken}`, 'Content-Type': 'application/json' });
            if (!rs) throw createError({ statusCode: 400, statusMessage: "Không tìm thấy dữ liệu!" });
            return rs;
      } catch (error: any) {
          
            return {
                  status: error.status,
                  message: error.message
            }
      }
});