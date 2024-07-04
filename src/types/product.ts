import type {ProductDetail} from "@/types/productDetail";

export interface Product {
    produit_id: string;
    quantite: number;
    quantite_max?: number;
    produit?: ProductDetail;
}