import type { ITransportSystem, ITransportSystemFilter } from "~/types/TransportSystem"

export const useTransportSystem = () => {
    const state = reactive({
        isLoading: false,
        transports: [] as ITransportSystem[],
        totalRows: 0,
        totalPages: 0,
        page: 1,
        limit: 10,
        transportDetail: {} as ITransportSystem

    })
    // Lây danh sách
    const getList = async (page: number, limit: number, fields: string, filter: ITransportSystemFilter) => {
        state.isLoading = true;

        try {
            // Đọc thông tin access token từ cookies
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;

            const response = await $fetch('/api/transportsystem', {
                method: 'POST',
                query: {
                    page: page,
                    limit: limit,
                    sort_by: 'name_desc',
                    fields: fields
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: filter
            })
            if (!response || !response.data) {
                throw {
                    status: 400,
                    message: "Không tìm thấy dữ liệu"
                }
            }

            // Lấy được dữ liệu
            state.transports = ('data' in response ? response.data : []) || [];
            state.totalRows = ('pagination' in response ? response.pagination?.count : 1) || 1;
            state.isLoading = false;
            state.page = page;
            state.limit = limit;
            state.totalPages = ('pagination' in response ? response.pagination?.total_page : 1) || 1;
        } catch (error: any) {
            console.error(error);
            state.isLoading = false;
            throw {
                status: error.status || 500,
                message: error.message || "Lỗi không xác định!"
            }
        }


    }
    // Lấy chi tiết
    const getDetail = async (id: string) => {
        state.isLoading = true;
        try {
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            const response = await $fetch('/api/transportsystem/detail', {
                method: 'GET',
                query: {
                    id: id
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response || typeof response !== 'object' || !('id' in response)) {
                throw {
                    status: 400,
                    message: "Không tìm thấy dữ liệu"
                };
            }

            console.log('response',response);
            state.transportDetail = response;
            state.isLoading = false;
            console.log(state);
        } catch (error: any) {
            console.error(error);
            state.isLoading = false;
            throw {
                status: error.status || 500,
                message: error.message || "Lỗi không xác định!"
            };
        }
    }
    return { state, getList, getDetail }


}
