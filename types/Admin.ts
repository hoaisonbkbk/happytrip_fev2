export interface IAdmin {
    id?: string;
    last_name?: string;
    first_name?: string;
    password?: string;
    full_name?: string;
    phone?: string;
    create_date?: string;
}
export interface IAdminFilter extends IAdmin{
    ids?:string[];
    keyword?:string
}