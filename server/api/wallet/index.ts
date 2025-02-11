import WalletService from "~/services/WalletService";


export default defineEventHandler(async (event) => {
    try{
        // Đọc thông tin filter
        var body = await readBody(event);
        var query = await getQuery(event);
        // Đọc thông tin token từ header bắn đến
        var token = getHeader(event, 'Authorization') as string;
        var headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
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
        if(!token) throw createError({
            statusCode: 401,
            statusMessage: "Thiếu thông tin token!"
        });
        // Gọi API lấy danh sách
        var rs = await WalletService.GetListWithFilter(headers,query,body);
        if(!rs) throw createError({
            statusCode: 400,
            statusMessage: "Không tìm thấy dữ liệu!"
        });

        return rs;
    }catch(error:any){
        throw createError({
            statusCode: error.status || 500,
            statusMessage: error.message || "Lỗi không xác định!"
        })
    }
})
