import type { IOrder, IOrderFilter, IQuickOrder } from "~/types/Order";

export const useOrder = () => {
    const state = reactive({
        isLoading: false,
        orders: [] as IOrder[],
        totalRows: 0,
        totalPages: 0,
        orderDetail: {} as IOrder,
        orderCalc: {} as IOrder
    });
    const GetList = async (page: number, limit: number, fields: string, filter: IOrderFilter) => {
        state.isLoading = true;
        try {
            // Đọc thông tin access token từ cookies
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            if (!accessToken) throw createError({
                statusCode: 401,
                statusMessage: "Thiếu thông tin token!"
            });
            var query = {
                page: page,
                limit: limit,
                fields: fields
            }
            var header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            // Gọi lên API Server Proxy để lấy dữ liệu
            var rs = await $fetch('/api/order/list', {
                method: 'POST',
                body: JSON.stringify(filter),
                query: query,
                headers: header
            });
            if (!rs) throw createError({
                statusCode: 400,
                statusMessage: "Không tìm thấy dữ liệu!"
            });
            // Ensure rs.data is an array of IOrder
            state.orders = Array.isArray(rs.data) ? rs.data as IOrder[] : [];
            // Check if pagination exists before accessing its properties
            state.totalRows = rs.pagination?.count || 1;
            state.totalPages = rs.pagination.total_page || 1;
        } catch (error: any) {
            throw createError({
                statusCode: error.status,
                statusMessage: error.message
            })
        } finally {
            state.isLoading = false;
        }
    }
    const GetDetail = async (id: string) => {
        try {
            state.isLoading = true;
            // Đọc thông tin access token từ cookies
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            if (!accessToken) throw createError({
                statusCode: 401,
                statusMessage: "Thiếu thông tin token!"
            });
            var header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            // Gọi lên API Server Proxy để lấy dữ liệu
            var rs = await $fetch('/api/order/' + id, {
                method: 'GET',
                headers: header
            });
            if (!rs) throw createError({
                statusCode: 400,
                statusMessage: "Không tìm thấy dữ liệu!"
            })
            state.orderDetail = rs;
        } catch (error: any) {
            throw createError({
                statusCode: error.status,
                statusMessage: error.message
            })
        } finally {
            state.isLoading = false;
        }
    }

    const CalcOrder = async (data: IQuickOrder) => {
        state.isLoading = true;
        try {
            // Đọc thông tin access token từ cookies
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            if (!accessToken) throw createError({
                statusCode: 401,
                statusMessage: "Thiếu thông tin token!"
            });
            var header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            // Gọi lên API Server Proxy để lấy dữ liệu
            var rs = await $fetch('/api/order/calc', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: header
            });
            if (!rs) throw createError({
                statusCode: 400,
                statusMessage: "Không tìm thấy dữ liệu!"
            });
            state.orderCalc = rs as IOrder || {};
        } catch (error: any) {
           
            throw {
                status: error.status,
                message: error.message
            }
        } finally {
            state.isLoading = false;
        }
    }
    return {
        state,
        GetList,
        GetDetail,
        CalcOrder
    }
}