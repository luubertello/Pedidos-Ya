import { UserI } from '../interfaces/user.interface';
import { BaseEntity } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Restaurant } from './restaurant.entity';
export declare class UserEntity extends BaseEntity implements UserI {
    id: number;
    email: string;
    password: string;
    role: RoleEntity;
    restaurants: Restaurant[];
}
