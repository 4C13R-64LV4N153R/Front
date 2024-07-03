import type { Product } from "./product";
import type { User } from "./user";
import type {DeliveryState} from "@/types/deliveryState";

export interface Order {
    order_id: number;
    user: User;
    bar_id: string;
    product: Product;
    state: DeliveryState;
    order_date: Date;
}