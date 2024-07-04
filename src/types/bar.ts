import type {Product} from "@/types/product";

export interface Bar {
    id: string;
    nom?: string;
    stocks: Product[];
    proposal?: Product[]
}