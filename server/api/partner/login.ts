import { RestApi } from "~/services/RestAPIService";
import { ITokenInfo } from "~/types/Partner";

export default defineEventHandler(async (event) => {
    // Đọc thông tin từ request
    const body = await readBody(event);
    const response = await RestApi<ITokenInfo>('/partner/login', 'POST', {
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
})