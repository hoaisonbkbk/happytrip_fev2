import type { IPagination } from "./Pagination";

export interface ITransportSystem {
    id?: string;
    hang_xe?: string;
    ten_xe?: string[];
    short_id?: string;
}
export interface ITransportSystemFilter {
    id?: string;
    hang_xe?: string;
    ten_xe?: string;
    short_id?: string;
}
export interface IListTransportSystem {
    data?: ITransportSystem[];
    pagination?: IPagination;
}