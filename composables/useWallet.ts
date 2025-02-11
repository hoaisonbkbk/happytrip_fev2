import type { IListWallet, IWallet, IWalletFilter } from "~/types/Wallet"

export const useWallet = () => {
    const state = reactive({
        wallets: [] as IWallet[],
        isLoading: false,
        totalRows: 0,
        totalPages: 0,
        page: 1,
        limit: 10,
        walletDetail: {} as IWallet
    })
    const GetList = async (page: number, limit: number, fields: string, filter: IWalletFilter) => {
        state.isLoading = true
        try{
            // Đọc thông tin access token từ cookies
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            if(!accessToken) throw createError({
                statusCode: 401,
                statusMessage: "Thiếu thông tin token!"
            });
            var query = {
                page: page,
                limit: limit
            }
            // Gọi qua service/api 
            const response = await $fetch<IListWallet>('/api/wallet', {
                method: 'POST',
                body: JSON.stringify(filter),
                query: query,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if(!response) throw createError({
                statusCode: 400,
                statusMessage: "Không tìm thấy dữ liệu!"
            });
            state.wallets = response.data || [];
            state.totalRows = response.pagination?.count || 1;
            state.totalPages = response.pagination?.total_page || 0;
        }catch(error:any){
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || "Lỗi không xác định!"
            })
        }finally{
            state.isLoading = false
        }
    }
    return {
        state,
        GetList
    }
}
