import type { IListOrder, IOrder, IOrderDTO, IOrderFilter } from "~/types/Order";
import { RestApi } from "./RestAPIService";
import { createError } from "~/utils/createError";

export class OrderService {
    // Lấy danh sách chuyến đi
    GetListWithFilter(query?: Record<string, any>, headers?: Record<string, string>, filter?: Partial<IOrderFilter>): Promise<IListOrder> {
        try {
            return RestApi("/order/list", "POST", { body: filter, headers: headers, query: query });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }

    // Lấy chi tiết
    GetDetail(id: string, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return RestApi<IOrder>('/order/' + id, 'GET', { headers: headers });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }

    async calculate(data: Partial<IOrderDTO>, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return await RestApi<IOrder>("/order/calc-order", "POST", {
                body: data,
                headers
            });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }

    async acceptOrder(id: string, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return await RestApi<IOrder>(`/order/${id}/accept`, "POST", { headers });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }

    async getCounter(filter: Partial<IOrderFilter>, headers?: Record<string, string>): Promise<number> {
        try {
            return await RestApi<number>("counter", "POST", { 
                body: filter, 
                headers 
            });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }

    async export(filter: Partial<IOrderFilter>, headers?: Record<string, string>): Promise<void> {
        try {
            return await RestApi<void>("/order/export", "POST", { 
                body: filter, 
                headers 
            });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }

    async preview(data: Partial<IOrderDTO>, headers?: Record<string, string>): Promise<IOrder> {
        try {
            return await RestApi<IOrder>("/order/preview", "POST", { 
                body: data, 
                headers 
            });
        } catch (error: any) {
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            });
        }
    }
}

export default new OrderService();