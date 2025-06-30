import { Address } from './adress.entity';
import { Menu } from './menu.entity';
export declare class Restaurant {
    id: number;
    name: string;
    address: Address;
    imageUrl: string;
    menus: Menu[];
}
