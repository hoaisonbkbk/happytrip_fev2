import type { IDistrict } from "./District";

// Interface City
export interface ICity extends IDistrict {
    id?: string;
    districts?: IDistrict[]
}

// Khai báo luôn interface CityFilter
export interface ICityFilter extends IDistrict {
    ids?: string[];
    names?: string[];
    keyword?: string;
}