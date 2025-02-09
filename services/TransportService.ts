import type { IListTransportSystem, ITransportSystem } from "~/types/TransportSystem";
import { RestApi } from "./RestAPIService";

export class TransportService {
    // Lấy danh sách dựa trên bộ lọc (filter)
    ListWithFilter(headers?: Record<string, string>, query?: Record<string, any>, filter?: Record<string, any>)
        : Promise<IListTransportSystem> {
        try {
            return RestApi<IListTransportSystem>('/transportsystem/list', 'POST', { headers: headers, query: query, body: filter });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Thêm mới 1 hàng xe
    Create(data: Partial<ITransportSystem>) {
        try {
            return RestApi<ITransportSystem>('/transportsystem', 'POST', { body: data });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }

    // Lấy chi tiết
    GetById(id: string, headers?: Record<string, string>) {
        try {
            return RestApi<ITransportSystem>('/transportsystem/' + id, 'GET', { headers: headers });
        } catch (error: any) {
            console.error(error.response);
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }


    // Xóa theo id
    DeleteById(id: string, headers?: Record<string, string>) {
        try {
            return RestApi<ITransportSystem>('/transportsystem/' + id, 'DELETE', { headers: headers });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
}
export default new TransportService();