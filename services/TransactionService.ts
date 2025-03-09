import type { IListTransaction, ITransaction, ITransactionFilter } from "~/types/Transaction";
import { RestApi } from "./RestAPIService";
import { createError, ErrorCodes } from "~/utils/createError";

export class TransactionService {
    /**
     * Lấy danh sách giao dịch theo bộ lọc
     * @param headers - Headers cho request
     * @param query - Query parameters
     * @param filter - Bộ lọc
     * @returns Danh sách giao dịch đã phân trang
     */
    GetListWithFilter(
        headers?: Record<string, string>, 
        query?: Record<string, any>, 
        filter?: Record<string, any>
    ): Promise<IListTransaction> {
        try {
            return RestApi<IListTransaction>(
                "/transaction/list", 
                "POST",
                { 
                    body: filter, 
                    headers, 
                    query 
                }
            );
        } catch (error: any) {
            throw createError({
                statusCode: error.status || ErrorCodes.INTERNAL_ERROR,
                statusMessage: error.message || "Lỗi không xác định khi lấy danh sách giao dịch"
            });
        }
    }

    /**
     * Lấy chi tiết giao dịch theo ID
     * @param id - ID của giao dịch cần lấy chi tiết
     * @param headers - Headers cho request
     * @returns Chi tiết giao dịch
     */
    GetDetail(id: string, headers?: Record<string, string>): Promise<ITransaction> {
        try {
            if (!id) {
                throw createError({
                    statusCode: ErrorCodes.BAD_REQUEST,
                    statusMessage: 'ID giao dịch không được để trống'
                });
            }
            
            return RestApi<ITransaction>(
                '/transaction/detail?id=' + id, 
                'GET', 
                { headers }
            );
        } catch (error: any) {
            throw createError({
                statusCode: error.status || ErrorCodes.INTERNAL_ERROR,
                statusMessage: error.message || `Lỗi không xác định khi lấy chi tiết giao dịch`
            });
        }
    }
    
    /**
     * Tạo giao dịch mới
     * @param data - Dữ liệu giao dịch cần tạo
     * @param headers - Headers cho request
     * @returns Giao dịch đã được tạo
     */
    Create(data: Partial<ITransaction>, headers?: Record<string, string>): Promise<ITransaction> {
        try {
            if (!data || Object.keys(data).length === 0) {
                throw createError({
                    statusCode: ErrorCodes.BAD_REQUEST,
                    statusMessage: 'Dữ liệu giao dịch không được để trống'
                });
            }
            
            return RestApi<ITransaction>(
                '/transaction', 
                'POST', 
                { 
                    body: data,
                    headers
                }
            );
        } catch (error: any) {
            throw createError({
                statusCode: error.status || ErrorCodes.INTERNAL_ERROR,
                statusMessage: error.message || 'Lỗi không xác định khi tạo giao dịch'
            });
        }
    }
}

export default new TransactionService();