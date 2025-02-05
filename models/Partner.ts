import type { IPartner, IPartnerFilter } from "~/types/Partner";

export class Partner implements IPartner {
    constructor(Partner: Partial<IPartner>) {
        Object.assign(this, Partner);
    }
}
export class PartnerFilter implements IPartnerFilter {
    constructor(PartnerFilter: Partial<IPartnerFilter>) {
        Object.assign(this, PartnerFilter);
    }
}