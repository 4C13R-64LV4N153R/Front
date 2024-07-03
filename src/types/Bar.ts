import type {Product} from "@/types/product";

export interface Bar {
    bar_id: string;
    name: string;
   products: Product[]
}