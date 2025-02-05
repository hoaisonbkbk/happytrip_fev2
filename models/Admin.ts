import type { IAdmin, IAdminFilter } from "~/types/Admin";

export class Admin implements IAdmin {

    constructor(admin: Partial<IAdmin>) {
        Object.assign(this, admin);
    }
}
export class AdminFilter implements IAdminFilter {

    constructor(adminFilter: Partial<IAdminFilter>) {   
        Object.assign(this, adminFilter);
    }
}