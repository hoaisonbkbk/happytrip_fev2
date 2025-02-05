import type { ICity, ICityFilter } from "~/types/City";

// Export class City
export class City implements ICity {
    // Tạo constructor
    constructor(City: Partial<ICity>) {
        Object.assign(this, City);
    }
}


export class CityFilter implements ICityFilter {
    constructor(CityFilter: Partial<ICityFilter>) {
        Object.assign(this, CityFilter);
    }

}