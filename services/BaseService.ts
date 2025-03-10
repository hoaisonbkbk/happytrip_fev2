import { RestApi } from "./RestAPIService";
import { createError } from "~/utils/createError";

// Hàm base xử lý rest api bên ngoài
// Ý tưởng là enpoint sẽ là baseUrl + "endpoint"
export abstract class BaseService<T> {
    protected constructor(protected readonly endpoint: string) {}

    protected handleError(error: any) {
        if (error.statusCode) return error;
        
        return createError({
            statusCode: error.status || 500,
            statusMessage: error.message || 'Lỗi không xác định',
            cause: error
        });
    }

    protected async request<R>(
        path: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        options: {
            body?: unknown;
            query?: Record<string, string>;
            headers?: Record<string, string>;
        } = {}
    ): Promise<R> {
        try {
            // Chuẩn hóa endpoint và path
            const normalizedEndpoint = this.endpoint.startsWith('/') ? this.endpoint : `/${this.endpoint}`;
            const normalizedPath = path.startsWith('/') ? path : `/${path}`;
            
            const response = await RestApi<R>(
                `${normalizedEndpoint}${normalizedPath}`, 
                method, 
                {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                }
            );

            if (!response) {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Không tìm thấy dữ liệu'
                });
            }

            return response;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    // Generic CRUD operations với error handling
    async getList(options?: {
        filter?: Partial<T>;
        query?: Record<string, string>;
        headers?: Record<string, string>;
    }): Promise<any> {
        try {
            return await this.request<any>("list", "POST", {
                body: options?.filter,
                query: options?.query,
                headers: options?.headers
            });
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async getDetail(id: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(`/${id}`, "GET", { headers });
    }

    async create(data: Partial<T>, headers?: Record<string, string>): Promise<T> {
        return this.request<T>("", "POST", { body: data, headers });
    }

    async update(id: string, data: Partial<T>, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(`/${id}`, "PUT", { body: data, headers });
    }

    async delete(id: string, headers?: Record<string, string>): Promise<void> {
        return this.request<void>(`/${id}`, "DELETE", { headers });
    }
}