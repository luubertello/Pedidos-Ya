import { Restaurant } from "./restaurant.entity";
export declare class Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    restaurant: Restaurant;
}
