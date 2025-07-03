import { RoleI } from "src/interfaces/role.interface";
import { BaseEntity } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "./user.entity";
export declare class RoleEntity extends BaseEntity implements RoleI {
    id: number;
    name: string;
    permission: PermissionEntity[];
    users: UserEntity[];
}
