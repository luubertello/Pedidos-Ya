import { Adress } from "./adress.entity";
import { Menu } from "./menu.entity";
export declare class Restaurant {
    id: number;
    name: string;
    adress: Adress;
    image: string;
    menus: Menu[];
}
