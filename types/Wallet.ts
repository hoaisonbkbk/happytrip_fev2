import type { IPagination } from "./Pagination";
import type { IPartner } from "./Partner";

export interface IWallet {
    id?:string;
    short_id?:string;
    wallet_deposit?:number;
    partner_id?:string;
    partner?:IPartner;
    balance?:number;
    balance_hold?:number;
    balance_available?:number;
    status?:boolean;
    created_at?:string;
    limit_debit?:string;
}
export interface IListWallet {
    pagination?:IPagination;
    data?:IWallet[];
}
export interface IWalletFilter {
    keyword?:string;
    id?:string;
    short_id?:string;
    short_ids?:string[];
    isSeller?:boolean;
    ids?:string[];
    partner_id?:string;
    partner_phone?:string;
    status?:boolean;
    affilate_id?:string;
    from_date?:string;
    to_date?:string;
    isAffilate?:boolean;
}
