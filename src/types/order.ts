import type { Product } from "./product";
import type {DeliveryState} from "@/types/deliveryState";
import type {User} from "@/types/user";
import type {Bar} from "@/types/bar";

export interface Order {
    id?: string;
    bar_id: string;
    statut: DeliveryState;
    date_livraison?: Date;
    utilisateur: User;
    produits: Product[];
    bar: Bar
}