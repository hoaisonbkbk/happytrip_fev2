import { useCookie } from "#app";
import type { IPartner, IPartnerFilter } from "~/types/Partner";

export const usePartner = () => {
    const state = reactive({
        partners: [] as IPartner[],
        totalRows: 1,
        totalPages: 1,
        loading: false,
        partnerDetail: {} as IPartner
    });

    const getPartner = async (page: number, limit: number, filter: IPartnerFilter) => {
        try {
            state.loading = true;
            // Lấy thông tin token từ store
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY1YTEwYjM2MTY3ZWI3ZmJkZmM2YzNlMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsIkZpcnROYW1lIjoiVMOobyIsIkxhc3ROYW1lIjoiVsSDbiIsIkZ1bGxOYW1lIjoiQWRtaW4iLCJQaG9uZSI6IjA4NTkyNDQyMjkiLCJUb2tlblR5cGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Im93bmVycyIsIm5iZiI6MTczOTY2OTM2MywiZXhwIjoxNzQyMjYxMzYzfQ.oeQjIal70TFsJa-fI7vPMO9EwfTWAUf1kdvxXJKeuow";
            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            const query = {
                page: page,
                limit: limit,
                sort_by: 'name_desc'
            }
            // Gửi vào server/api để lấy dữ liệu
            const response = await $fetch('/api/partner/list', {
                method: 'POST',
                body: JSON.stringify(filter),
                query: query,
                headers: header
            });

            if (!response) {
                throw {
                    status: 400,
                    message: 'Không tìm thấy dữ liệu'
                }
            }

            state.partners = response.data as IPartner[];
            state.totalPages = response.pagination?.total_page || 1;
            state.totalRows = response.pagination?.count || 1;
            console.log('state', state);
        } catch (error: any) {
            throw createError({
                statusCode: error.response.status,
                message: error.response.data.message,
            });
        } finally {
            state.loading = false;
        }
    };
    const getDetail = async (id: string) => {
        try {
            state.loading = true;
            // Lấy thông tin token từ store
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY1YTEwYjM2MTY3ZWI3ZmJkZmM2YzNlMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsIkZpcnROYW1lIjoiVMOobyIsIkxhc3ROYW1lIjoiVsSDbiIsIkZ1bGxOYW1lIjoiQWRtaW4iLCJQaG9uZSI6IjA4NTkyNDQyMjkiLCJUb2tlblR5cGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Im93bmVycyIsIm5iZiI6MTczOTY2OTM2MywiZXhwIjoxNzQyMjYxMzYzfQ.oeQjIal70TFsJa-fI7vPMO9EwfTWAUf1kdvxXJKeuow";
            // Gửi vào server/api để lấy dữ liệu
            const response = await $fetch('/api/partner/detail?id=' + id, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response) {
                throw {
                    status: 400,
                    message: 'Không tìm thấy dữ liệu'
                }
            }
            state.partnerDetail = response;
        } catch (error: any) {
            console.log('compo',error.message);
            throw createError({
                statusCode: error.response.status,
                message: error.message,
            });
        } finally {
            state.loading = false;
        }
    };
    return { state, getPartner, getDetail };
}
