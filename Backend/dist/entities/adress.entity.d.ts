import { Location } from "./location.entity";
import { Restaurant } from "./restaurant.entity";
export declare class Adress {
    id: number;
    street: string;
    number: number;
    cityID: number;
    location: Location;
    restaurant: Restaurant;
}
