import type { IDistrict } from "~/types/District";

export class District implements IDistrict {
    constructor(District: Partial<IDistrict>) {
        Object.assign(this, District);
    }
}