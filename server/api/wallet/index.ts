import WalletService from "~/services/WalletService";


export default defineEventHandler(async (event) => {
    try{
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
       
        // Gọi API lấy danh sách
        var rs = await WalletService.GetListWithFilter(headers,query,body);
        console.log('response',rs);
        if(!rs) throw createError({
            statusCode: 400,
            statusMessage: "Không tìm thấy dữ liệu!"
        });
        console.log('wallet response',rs);

        return rs;
    }catch(error:any){
        throw createError({
            statusCode: error.status || 500,
            statusMessage: error.message || "Lỗi không xác định!"
        })
    }
})
