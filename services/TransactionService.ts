import type { IListTransaction, ITransaction } from "~/types/Transaction";
import { RestApi } from "./RestAPIService";

export class TransactionService {
    // Xử lý các nghiệp vụ liên quan tới giao dịch, chủ yếu ở đây chỉ có show và tạo giao dịch
    GetListWithFilter(headers?: Record<string, string>, query?: Record<string, any>, filter?: Record<string, any>)
        : Promise<IListTransaction> {
        try {
            return RestApi("/transaction/list", "POST",
                { body: filter, headers: headers, query: query });
        } catch (error: any) {
            console.log(error);
            // Trả về lỗi có status và message
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }

    // Lấy chi tiết giao dịch
    GetDetail(id: string, headers?: Record<string, string>): Promise<ITransaction> {
        try {
            return RestApi<ITransaction>('/transaction/detail?id=' + id, 'GET', { headers: headers });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
}
export default new TransactionService();