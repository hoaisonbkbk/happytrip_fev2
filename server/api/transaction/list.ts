import TransactionService from "~/services/TransactionService";


export default defineEventHandler(async (event) => {
    try {
        // Đọc thông tin filter
        var body = await readBody(event);
        var query = await getQuery(event);
        var authorization =  getHeader(event,'Authorization') as string;
        
        var headers = {
            'Content-Type': 'application/json',
            Authorization: authorization
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
        var rs = await TransactionService.GetListWithFilter(headers,query,body);
       
        if(!rs) throw createError({
            statusCode: 400,
            statusMessage: "Không tìm thấy dữ liệu!"
        });
        return rs;
    } catch (error: any) {
        return createError({
            statusCode: error.status || 500,
            message: error.message || 'Something went wrong'
        })
    }
})