import PartnerService from "~/services/PartnerService";

export default defineEventHandler(async (event) => {
    try {
        // Lấy thông tin query
        var query = getQuery(event);
        // Lấy thông tin body
        var body = await readBody(event);
        // Lấy thông tin header
        var token =  getHeader(event, 'Authorization') as string;
        var header = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        // Kiểm tra thông tin trước khi yêu cầu service
        if(!query){
            return {
                status: 400,
                message: 'Chưa cung cấp dữ liệu query'
            }
        }
        if(!body){
            return {
                status: 400,
                message: 'Chưa cung cấp dữ liệu body'
            }
        }
        if(!header){
            return {
                status: 400,
                message: 'Chưa cung cấp dữ liệu header'
            }
        }
        var rs = await PartnerService.GetListWithFilter(header, query, body);
    } catch (error: any) {
        return {
            status: error.status || 500,
            message: error.message || "Lỗi không xác định!"
        }
    }
})