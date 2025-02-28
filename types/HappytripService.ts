import type { IPagination } from "./Pagination";

export interface IHappytripService{
    id?:string;
    name?:string;
    description?:string;
    service_name?:string;
    is_show?:boolean;
}
export interface IHappytripServiceFilter{
    id?:string;
    keyword?:string;
}
export interface IListHappytripService{
    pagination?: IPagination;
    data?: IHappytripService[];
}