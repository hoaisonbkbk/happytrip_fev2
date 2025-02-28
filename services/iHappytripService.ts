import type { IHappytripService, IHappytripServiceFilter, IListHappytripService } from "~/types/HappytripService";
import { RestApi } from "./RestAPIService";

export class iHappyTripService {
    // Lấy danh sách chuyến đi
    GetListWithFilter(query: Record<string, any>, header: Record<string, string>,
        filter: Partial<IHappytripServiceFilter>): Promise<IListHappytripService> {
        try{
            return RestApi(
                '/service/list',
                'POST',
                { body: filter, headers: header, query: query }
            );
        }catch(error: any){
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
    // Lấy chi tiết
    GetDetail(id:string,header:Record<string,string>):Promise<IHappytripService>{
        try{
            return RestApi(
                '/service/' + id,
                'GET',
                { headers: header }
            );
        }catch(error:any){
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định!" };
        }
    }
}
export default new iHappyTripService();