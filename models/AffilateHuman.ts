import type { IAffilateFilter, IAffilateHuman } from "~/types/AffilateHuman";

export class AffilateHuman implements IAffilateHuman {
    constructor(AffilateHuman: Partial<IAffilateHuman>) {
        Object.assign(this, AffilateHuman);
    }
}

export class AffilateHumanFilter implements IAffilateFilter {
    constructor(AffilateHumanFilter: Partial<IAffilateFilter>) {
        Object.assign(this, AffilateHumanFilter);
    }
}