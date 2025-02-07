import { RestApi } from "./RestAPIService";

// Hàm base xử lý rest api bên ngoài
// Ý tưởng là enpoint sẽ là baseUrl + "endpoint"
export default class BaseService<T> {
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    // Các hàm căn bản Thêm/ Sửa/ Xóa/ Danh sách
    async getAll(headers?: Record<string, string>, query?: Record<string, any>): Promise<T[]> {
        return await RestApi<T[]>(this.endpoint, 'GET', { headers: headers, query: query });
    }
    // Lấy danh sách theo bộ lọc (filter)
    async getAllWithFilter(headers?: Record<string, string>, query?: Record<string, any>, filter?: Record<string, any>): Promise<T[]> {
        return await RestApi<T[]>(this.endpoint, 'POST', { headers: headers, query: query, body: filter });
    }

    // Thêm mới
    async create(data: Partial<T>): Promise<T> {
        return await RestApi<T>(this.endpoint, 'POST', { body: data });
    }

    // Cập nhật theo id
    async update(id: string, data: Partial<T>): Promise<T> {
        return await RestApi<T>(`${this.endpoint}/${id}`, 'PUT', { body: data });
    }

    // Xóa theo id
    async delete(id: string): Promise<void> {
        return await RestApi<void>(`${this.endpoint}/${id}`, 'DELETE');
    }
}