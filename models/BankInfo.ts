import type { IBankInfo } from "~/types/BankInfo";

export class BankInfo implements IBankInfo {
    constructor(BankInfo: Partial<IBankInfo>) {
        Object.assign(this, BankInfo);
    }
}
