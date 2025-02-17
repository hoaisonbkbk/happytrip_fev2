import type { ITransaction, ITransactionFilter } from "~/types/Transaction";

export const useTransaction = () => {
    const state = reactive({
        transactions: [] as ITransaction[],
        isLoading: false,
        totalRows: 0,
        totalPages: 0,
        page: 1,
        limit: 10,
        transactionDetail: {} as ITransaction
    });
    const GetList = async (page: number, limit: number, fields: string, filter: ITransactionFilter) => {
        state.isLoading = true
        try{
            const accessToken = (useCookie('auth_partner_token')?.value ?? "") as string;
            if(!accessToken) throw createError({
                statusCode: 401,
                message: "Thiếu thông tin token!"
            });
            var query = {
                page: page,
                limit: limit
            }
            var header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            var rs = await $fetch('/api/transaction/list', {
                method: 'POST',
                body: JSON.stringify(filter),
                query: query,
                headers: header
            })
            state.transactions = rs.data || [];
            state.totalRows = rs.pagination?.count || 1;
            state.totalPages = rs.pagination?.total_page || 1;
        }catch(error:any){
            return createError({
                statusCode: error.status,
                message: error.message
            });
           
        }finally{
            state.isLoading = false
        }
    }   
    return {
        state,
        GetList
    };
}