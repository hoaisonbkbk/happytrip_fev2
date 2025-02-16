import PartnerService from "~/services/PartnerService";

export default defineEventHandler(async (event) => {
    // Đọc thông tin từ request
    try {
        //const body = await readBody(event);
        const query = getQuery(event);
        const id = query.id as string;
        //
        const header = getHeaders(event);
        console.log('header',header);
        // Đọc thông tin token từ header
        const accessToken = getHeader(event, 'Authorization') as string;
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
        }
     
        // Lấy thông tin dựa vào getDetai
        const response = await PartnerService.GetDetailById(id, headers);
        return response;
    } catch (e: any) {
        return createError({
            statusCode: e.status || 500,
            message: e.message || 'Something went wrong'
        })
    }

})