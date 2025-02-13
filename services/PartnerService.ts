
import type { IListPartner, IPartner } from "~/types/Partner";
import { RestApi } from "./RestAPIService";
import type { IBankInfo } from "~/types/BankInfo";

export class PartnerService {
    // Lấy danh sách tài xế
    GetListWithFilter(headers?: Record<string, string>, query?: Record<string, string>, filter?: Record<string, string>)
        : Promise<IListPartner> {
        try {
            return RestApi("partner/list", "POST", { body: filter, headers: headers, query: query });
        } catch (error: any) {
            // Trả về lỗi có status và message
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }
    // Chi tiết tài xế
    GetDetailById(id: string, headers?: Record<string, string>): Promise<IPartner> {
        try {
            return RestApi(`partner/${id}`, "GET", { headers: headers });
        } catch (error: any) {
            // Trả về lỗi có status và message
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }

    // Chi tiết tài xế theo token
    GetMe(header?: Record<string, string>): Promise<IPartner> {
        try {
            return RestApi("partner/me", "GET", { headers: header });
        } catch (error: any) {
            // Trả về lỗi có status và message
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }
    // Tạo mới tài xế
    CreateOneAsync(data: Partial<IPartner>, header?: Record<string, string>): Promise<IPartner> {
        try {
            return RestApi("partner", "POST", { headers: header, body: data });
        } catch (error: any) {
            // Trả về lỗi có status và message
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }
    // Cập nhật mật khẩu
    ChangePasswordAsync(query?: Record<string, string>, header?: Record<string, string>): Promise<IPartner> {
        try {
            return RestApi("partner/change-password", "PUT", { query: query, headers: header });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }
    // Cập nhật bank
    ChangeBankAsync(header: Record<string, string>, body: Partial<IBankInfo>): Promise<IPartner> {
        try {
            return RestApi("partner/change-bank", "PUT", { headers: header, body: body });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }

    // Cập nhật thông tin tài xê
    UpdateOneAsync(id: string, data: Partial<IPartner>, header?: Record<string, string>): Promise<IPartner> {
        try {
            return RestApi(`partner/${id}`, "PUT", { headers: header, body: data });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }

    // Xóa tài xế
    DeleteOneAsync(id: string, header?: Record<string, string>) {
        try {
            return RestApi(`partner/${id}`, "DELETE", { headers: header });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }
    // Cập nhật trạng thái tài xế
    ChangeStatusAsync(id: string, status: number, header?: Record<string, string>) {
        try {
            return RestApi(`partner/${id}/verification?status=${status}`, "PUT", { headers: header });
        } catch (error: any) {
            throw { status: error.status || 500, message: error.message || "Lỗi không xác định" }
        }
    }
}
export default new PartnerService();
