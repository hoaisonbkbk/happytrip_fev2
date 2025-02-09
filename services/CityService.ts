import type { IListCity } from "~/types/City";
import { RestApi } from "./RestAPIService";

export class CityService {
    // Lấy danh sách tỉnh thành
    GetListWithFilter(headers?: Record<string, string>, query?: Record<string, any>, filter?: Record<string, any>)
    : Promise<IListCity> {
        try {
            var rs =  RestApi<IListCity>('/city/v1/list', 'POST', { headers: headers, query: query, body: filter });
            console.log('hihi',rs);
            return rs;
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Xóa theo id
    DeleteById(id: string,headers?: Record<string, string>): Promise<void> {
        try {
            return RestApi<void>('/city/' + id, 'DELETE', { headers: headers });
        } catch (error: any) {
            console.error(error.response);
            // ✅ Trả về lỗi có `status` & `message`
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
}
export default new CityService();