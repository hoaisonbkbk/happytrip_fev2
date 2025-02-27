import type { IDistrict } from "./District";
import type { IPagination } from "./Pagination";

// Interface City
export interface ICity extends IDistrict {
    id?: string;
    count?: number;
    districts?: IDistrict[]
}

// Khai báo luôn interface CityFilter
export interface ICityFilter extends IDistrict {
    ids?: string[];
    names?: string[];
    keyword?: string;
    status?: boolean;
}
export interface IListCity{
    pagination?: IPagination;
    data?: ICity[];
}