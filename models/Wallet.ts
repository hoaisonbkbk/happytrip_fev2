import type { IWalletFilter } from "~/types/Wallet";

export class WalletFilter implements IWalletFilter {
    constructor(filter: IWalletFilter) {
        Object.assign(this, filter);
    }
}
