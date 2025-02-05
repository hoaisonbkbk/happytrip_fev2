import type { ITransportSystem, ITransportSystemFilter } from "~/types/TransportSystem";

export class TransportSystem implements ITransportSystem {
    constructor(TransportSystem: Partial<ITransportSystem>) {
        Object.assign(this, TransportSystem);
    }
}

export class TransportSystemFilter implements ITransportSystemFilter {
    constructor(TransportSystemFilter: Partial<ITransportSystemFilter>) {
        Object.assign(this, TransportSystemFilter);
    }
}