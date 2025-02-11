import type { IPartner } from "~/types/Partner";
import type { ITokenInfo } from "~/types/TokenInfo";
import { RestApi } from "./RestAPIService";

// Xử lý mỗi login thôi chứ làm mẹ gì đâu
export class AuthService {

    // Login
    Login(partner: IPartner): Promise<ITokenInfo> {
        try {
            return RestApi<ITokenInfo>('/admin/login', 'POST', {
                body: partner,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }

    }
}
export default new AuthService();