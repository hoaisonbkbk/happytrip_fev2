import { RestApi } from "~/services/RestAPIService";

export default defineEventHandler(async (event) => {
    // Đọc thông tin từ request
    const body = await readBody(event);
    const response = await RestApi('/partner/login', 'POST', {
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
})