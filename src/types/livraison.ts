import type { Product } from "./product";
import type { Utilisateur } from "./utilisateur";



export interface Livraison {
    livraison_id: number;
    user: Utilisateur;
    bar: string;
    product: Product;
    state: string;
    date_livraison: Date;
  }