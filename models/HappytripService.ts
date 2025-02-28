import type { IHappytripService, IHappytripServiceFilter } from "~/types/HappytripService";

export class HappyTripService implements IHappytripService {
    constructor(data: IHappytripService){
        Object.assign(this, data);
    }
}

export class HappyTripServiceFilter implements IHappytripServiceFilter {
    constructor(data: IHappytripServiceFilter){
        Object.assign(this, data);
    }
   
}