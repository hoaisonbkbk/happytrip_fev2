import type { IBankInfo } from "./BankInfo";
import type { ITransport } from "./Transport";
import type {IPagination} from "~/types/Pagination";

// Thông tin partner
export interface IPartner {
    id?: string;
    full_name?: string;
    phone?: string;
    password?: string;
    transport?: ITransport;
    status_type?: number;
    bank_info?: IBankInfo;
    created_at?: string;
    isFreezen?: boolean;
    otp_sms?: string;
}

// Bộ lọc partner filter
export interface IPartnerFilter {
    keyword?: string;
    id?: string;
    keywordType?: string;
    phone?: string;
    password?: string;
    ids?: string[];
    status?: number;
    transport_type?: number;
    license_plate?: string;
}
export interface IListPartner {
    data?: IPartner[];
    pagination?: IPagination;
}