import type { IAddress } from "./Address";
import type { IPagination } from "./Pagination";
import type { IPartner } from "./Partner";
import type { IUserInformation } from "./UserInformation";

export interface IOrder {
    id?: string;
    short_id?: string;
    id_service?: string;
    name_service?: string;
    departure?: IAddress;
    destination?: IAddress;
    date_of_destination?: string;
    partner?: IPartner;
    quantity?: number;
    price?: number;
    price_after?: number;
    price_guest_after?: number;
    price_guest?: number;
    price_system?: number;
    net_profit?: number;
    distance?: number;
    status_type?: number;
    status_name?: string;
    total_transaction?: number;
    creator?: IUserInformation;
    note?: string;
}
export interface IListOrder {
    pagination?: IPagination;
    data?: IOrder[]
}
export interface IOrderFilter {
    from_date_of_destination?: string;
    to_date_of_destination?: string;
    keyword?: string;
    ids?: string[];
    order_status?: number;
    have_partner?: boolean;
    city_diemdon?: string;
    city_diemden?: string;
    partner_id?: string;
    partner_ids?: string[];
    district_depature?: string;
    district_destination?: string;
    order_expired?: boolean;
}
export interface IOrderDTO{
    id?:string;
    service_name?:string;
    booking_type_id?:string;
    address_from_id?:string;
    address_from_name?:string;
    address_to_id?:string;
    address_to_name?:string;
    date_go?:string;
    date_back?:string;
    size_id?:string;
    seat_id?:string;
    direction_id?:string;
    fullname?:string;
    phone?:string;
    amount?:string;
    status?:string;
    note?:string;
    comment?:string;
    other?:string;
    created_at?:string;
    updated_at?:string;
    type_name?:string;
    from_address?:string;
    from_province?:string;
    to_province?:string;
    to_address?:string;
    seat_name?:string;
    size_name?:string;
    direction_name?:string;
}
export interface IQuickOrder{
    id_order?:string;
    name_service?:string;
    id_service?:string;
    full_name?:string;
    phone?:string;
    date_of_destination?:string;
    quantity?:number;
    departure_city?:string;
    departure_city_id?:string;
    departure_district?:string;
    departure_address_1?:string;
    destination_city?:string;
    destination_city_id?:string;
    destination_district?:string;
    destination_address_1?:string;
    price?:number;
    price_guest?:number;
    price_system?:number;
    price_guest_after?:number;
    net_profit?:number;
    note?:string;
    partner_phone?:string;
}