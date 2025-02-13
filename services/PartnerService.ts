import type { IListPartner } from "~/types/Partner";
import { RestApi } from "./RestAPIService";

export class PartnerService {
    // Lấy danh sách tài xế
    GetListWithFilter(headers?:Record<string,string>,query?:Record<string,string>,filter?:Record<string,string>)
    : Promise<IListPartner> {
        try {
            
        }
}
export default new PartnerService();
