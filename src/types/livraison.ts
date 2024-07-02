import type { Product } from "./product";
import type { Utilisateur } from "./utilisateur";


export enum StateDelivery{
    en_attente,
    en_cours_de_livraison,
    terminer,
    refuser,
}
export interface Livraison {
    livraison_id: number;
    user: Utilisateur;
    bar: string;
    product: Product;
    state: StateDelivery;
    date_livraison: Date;
  }