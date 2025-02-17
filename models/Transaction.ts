import type { ITransaction, ITransactionFilter } from "~/types/Transaction";

export class Transaction implements ITransaction {
    constructor(data: Partial<ITransaction>) {
        Object.assign(this, data);
    }
    
}
export class TransactionFilter implements ITransactionFilter{
    constructor(data: Partial<ITransactionFilter>) {
        Object.assign(this, data);
    }
}