import type { IHappytripService, IHappytripServiceFilter } from "~/types/HappytripService";

export const useService = () => {
    const state = reactive({
        services: [] as IHappytripService[],
        totalRows: 1,
        totalPages: 1,
        serviceDetail: {} as IHappytripService,
    });

    const GetList = async (page: number, limit: number, fields: string, filter: IHappytripServiceFilter) => {
        try {
            // Lấy thông tin token từ store
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            const query = {
                page: page,
                limit: limit,
                sort_by: fields
            }
            // Gửi vào server/api để lấy dữ liệu
            const response = await $fetch('/api/happyservice/list', {
                method: 'POST',
                body: filter,
                query: query,
                headers: header
            });
            if (!response) {
                throw {
                    status: 400,
                    message: 'Không tìm thấy dữ liệu'
                }
            }
            state.services = response.data || [];
            state.totalPages = response.pagination?.total_page || 1;
            state.totalRows = response.pagination?.count || 1;
        } catch (error: any) {
            throw createError({
                statusCode: error.response?.status || 500,
                message: error.response?.data?.message || 'Unknown error',
            });
        }
    };

    const GetDetail = async (id: string) => {
        try {
            // Lấy thông tin token từ store
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            // Gửi vào server/api để lấy dữ liệu
            const response = await $fetch('/api/happyservice/' + id, {
                method: 'GET',
                headers: header
            });
            if (!response) {
                throw {
                    status: 400,
                    message: 'Không tìm thấy dữ liệu'
                }
            }
            state.serviceDetail = response.data || {};
        } catch (error: any) {
            throw createError({
                statusCode: error.response?.status || 500,
                message: error.response?.data?.message || 'Unknown error',
            });
        }
    };

    return {
        state,
        GetList,
        GetDetail,
    };
}