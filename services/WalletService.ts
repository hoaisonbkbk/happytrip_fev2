import type { IListWallet, IWallet } from "~/types/Wallet";
import { RestApi } from "./RestAPIService";

export class WalletService {
    // Lấy danh sách ví tiền seller
    GetListWithFilter(headers?: Record<string, string>, query?: Record<string, any>, filter?: Record<string, any>)
    : Promise<IListWallet> {
        try {
            var rs =  RestApi<IListWallet>('/wallet/list', 'POST', { headers: headers, query: query, body: filter });
            return rs;
        } catch (error: any) {
            console.error('error',error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Lấy danh sách ví tiền theo ID
    Detail(headers?: Record<string, string>): Promise<IWallet> {
        try {
            return RestApi<IWallet>('/wallet/detail', 'GET', { headers: headers });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    //
}
export default new WalletService();
