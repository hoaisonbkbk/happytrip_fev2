import type { IPagination } from "./Pagination";
import type { IUserInformation } from "./UserInformation";

export interface ITransaction {
    id?: string;
    code?: string;
    creator?: IUserInformation;
    partner_id?: string;
    affilate_id?: string;
    wallet_id?: string;
    wallet_short_id?: string;
    display_id?: string;
    user_receiving?: IUserInformation;
    name?: string;
    desciption?: string;
    amount?: number;
    status?: number;
    status_value?: string;
    method?: string;
    created_at?: string;
    balance_after?: number;
    balance_before?: number;
    object_id?: string;
    object_type?: number;
    object_name?: string;
    note?: string;
}
export interface IListTransaction{
    pagination?:IPagination;
    transactions?:ITransaction[];
}
export interface ITransactionFilter{
    id?:string;
    ids?:string[];
    from_date?:string;
    to_date?:string;
    keyword?:string;
    wallet_id?:string;
    wallet_short_id?:string;
}