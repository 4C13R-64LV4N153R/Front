import type { Product } from "./product";
import type {DeliveryState} from "@/types/deliveryState";

export interface Order {
    id?: string;
    utilisateur_id: string;
    bar_id: string;
    stocks: Product[];
    statut: DeliveryState;
    date_livraison?: Date;
}