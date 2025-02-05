import type { IBankInfo } from "./BankInfo";

export interface IAffilateHuman {
    id?: string;
    short_id?: string;
    full_name?: string;
    phone?: string;
    bank_info?: IBankInfo;
    password?: string;
    roles?: string[];
    created_date?: string;
    status?: boolean;
}

export interface IAffilateFilter extends IAffilateHuman {
    keyword?: string;
    keywordType?: string;
    ids?: string[];
}