import type { ITransport } from "~/types/Transport";

export class Transport implements ITransport {
    constructor(Transport: Partial<ITransport>) {
        Object.assign(this, Transport);
    }
}