import type { IPartner, IPartnerFilter } from "~/types/Partner";

export const usePartner = () => {
    const state = reactive({
        partners: [] as IPartner[],
        totalRows: 1,
        totalPages:1,
        loading: false,
    });
    
    const getPartner = async (page: number, limit: number,filter:IPartnerFilter) => {
        try{
            state.loading = true;
            // Lấy thông tin token từ store
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
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
            const response = await $fetch('/api/partner/list',{
                method: 'POST',
                body: filter,
                query: query,
                headers: header
            });
            if(!response){
                throw {
                    status: 400,
                    message: 'Không tìm thấy dữ liệu'
                }
            }
            state.partners = response;
        }catch(error:any){
            throw createError({
                statusCode: error.response.status,
                message: error.response.data.message,
            });
        }finally{
            state.loading = false;
        }
    };
    return {state, getPartner};
}
