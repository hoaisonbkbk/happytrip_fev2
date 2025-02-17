import type { IOrder, IOrderDTO, IOrderFilter, IQuickOrder } from "~/types/Order";

export class Order implements IOrder {
    constructor(Order: Partial<IOrder>) {
        Object.assign(this, Order);
    }
}
export class OrderFilter implements IOrderFilter {
    constructor(OrderFilter: Partial<IOrderFilter>) {
        Object.assign(this, OrderFilter);
    }
}
export class OrderDTO implements IOrderDTO {
    constructor(OrderDTO: Partial<IOrderDTO>) {
        Object.assign(this, OrderDTO);
    }
}
export class QuickOrder implements IQuickOrder {
    constructor(QuickOrder: Partial<IQuickOrder>) {
        Object.assign(this, QuickOrder);
    }
}