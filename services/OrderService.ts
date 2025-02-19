import type { IListOrder, IOrder, IOrderDTO, IOrderFilter } from "~/types/Order";
import { RestApi } from "./RestAPIService";

export class OrderService {
    // Lấy danh sách chuyến đi
    GetListWithFilter(query?: Record<string, any>, headers?: Record<string, string>, filter?: Partial<IOrderFilter>): Promise<IListOrder> {
        try {
            return RestApi("/order/list", "POST", { body: filter, headers: headers, query: query });
        } catch (error: any) {
            console.log(error);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Lấy chi tiết
    GetDetail(id: string, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return RestApi<IOrder>('/order/' + id, 'GET', { headers: headers });
        } catch (error: any) {
            console.log(error);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Đếm số lượng theo bộ lọc
    GetCounter(filter: Partial<IOrderFilter>, headers?: Record<string, string>): Promise<number> {
        try {
            return RestApi<number>("/order/counter", "POST", { body: filter, headers: headers });
        } catch (error: any) {
            console.log(error);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }

    // Export
    ExportAsync(filter: Partial<IOrderFilter>, headers?: Record<string, string>) {
        try {
            return RestApi("/order/export", "POST", { body: filter, headers: headers });
        } catch (error: any) {
            console.log(error);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }

    // Update
    UpdateOneAsync(id: string, data: Partial<IOrder>, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return RestApi<IOrder>("/order/" + id, "PUT", { body: data, headers: headers });
        } catch (error: any) {
            console.log(error);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Xóa
    DeleteOneAsync(id: string, headers?: Record<string, string>): Promise<void> {
        try {
            return RestApi<void>("/order/" + id, "DELETE", { headers: headers });
        } catch (error: any) {
            console.log(error);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Xem trạng thái chuyến đi
    PreviewAsync(data: Partial<IOrderDTO>, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return RestApi<IOrder>("/order/preview", "POST", { body: data, headers: headers });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }

    // Tính toán lại
    CalculateAsync(data: Partial<IOrderDTO>, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return RestApi<IOrder>("/order/calc-order", "POST", { body: data, headers: headers });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }

    // Tài xế đồng ý chuyến đi
    PartnerAcceptOrder(id:string,headers?: Record<string, string>): Promise<IOrder> {
        try {
            return RestApi<IOrder>(`/order/${id}/accept`, "POST", { headers: headers });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
}
export default new OrderService();