import { Restaurant } from "./restaurant.entity";
export declare class Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    restaurant: Restaurant;
}
