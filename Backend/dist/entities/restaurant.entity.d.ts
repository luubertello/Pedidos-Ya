import { Address } from './adress.entity';
import { Menu } from './menu.entity';
import { UserEntity } from './user.entity';
export declare class Restaurant {
    id: number;
    name: string;
    address: Address;
    imageUrl: string;
    menus: Menu[];
    owner: UserEntity;
}
